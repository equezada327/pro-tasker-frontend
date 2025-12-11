import axios from "axios";

// Try to get the authentication token from browser's localStorage when the app loads
// This allows users to stay logged in even after refreshing the page

// Create an axios instance for making API calls to our backend
// This is the main tool we use to communicate with the Express server
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Points to http://localhost:4000/api (from .env file)
  headers: {
    "Content-Type": "application/json", // Tell the server we're sending JSON data
  },
});

// Request interceptor - runs BEFORE every API call to add the auth token
// This ensures every request includes the JWT token so the backend knows who is making the request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get the current token from storage
    if (token) {
      // Add the token to the Authorization header in the format: "Bearer <token>"
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config; // Send the modified request
  },
  (error) => {
    return Promise.reject(error); // Handle any errors in setting up the request
  }
);