import { createContext, useState } from "react";
import type { User } from "../types";
import { apiClient } from "../clients/api";

// Define what data and functions the AuthContext will provide to all components
// This is the "contract" that tells other components what they can access
interface AuthContextType {
  user: User | null; // Currently logged in user, or null if not logged in
  setUser: (user: User | null) => void; // Function to update the user
  logIn: (email: string, password: string) => Promise<void>; // Function to log in
  register: (username: string, email: string, password: string) => Promise<void>; // Function to register
  logOut: () => void; // Function to log out
  token: string | null; // JWT token for authentication, or null if not logged in
  setToken: (token: string | null) => void; // Function to update the token
}

// Create the context - this allows us to share authentication state across the entire app
// Components can access this context to check if user is logged in and get user data
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode; // All child components that will have access to auth context
}

// AuthProvider wraps the entire app and provides authentication functionality
// Any component inside this provider can access user data and auth functions
export default function AuthProvider({ children }: AuthProviderProps) {
  // Initialize user state from localStorage - this keeps user logged in after page refresh
  // If there's a user saved in localStorage, load it; otherwise start with null
  const [user, setUser] = useState<User | null>(() => {
    try {
      const value = localStorage.getItem("user");
      if (value) {
        return JSON.parse(value); // Parse the stored JSON string back into a User object
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  // Initialize token state from localStorage - JWT token for API authentication
  // The token is sent with every API request to prove the user is logged in
  const [token, setToken] = useState<string | null>(() => {
    try {
      const value = localStorage.getItem("token");
      if (value) {
        return JSON.parse(value); // Parse the stored JSON string
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  // Login function - sends email and password to backend, receives user data and token
  // This is called when user submits the login form
  const logIn = async (email: string, password: string) => {
    try {
      // POST request to /api/users/login with credentials
      const res = await apiClient.post("/users/login", { email, password });
      console.log(res.data);
      
      // Store the token and user data in React state (for immediate use)
      setToken(res.data.token);
      setUser(res.data.user);

      // Store the token and user data in localStorage (for persistence across page refreshes)
      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error) {
      console.error(error);
      throw error; // Re-throw error so the login form can handle it (show error message)
    }
  };

  // Register function - creates a new user account
  // Sends username, email, and password to backend to create the account
  const register = async (username: string, email: string, password: string) => {
    try {
      // POST request to /api/users/register with new user data
      const res = await apiClient.post("/users/register", {
        username,
        email,
        password,
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
      throw error; // Re-throw error so the registration form can handle it
    }
  };

  // Logout function - clears all authentication data and redirects to login page
  // Called when user clicks the logout button
  const logOut = () => {
    // Clear React state
    setUser(null);
    setToken(null);

    // Clear localStorage (removes saved authentication data)
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to the authentication page
    window.location.href = "/auth";
  };

  // Provide all auth data and functions to child components
  // Any component can now use useContext(AuthContext) to access these values
  return (
    <AuthContext.Provider
      value={{ user, setUser, logIn, register, logOut, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}