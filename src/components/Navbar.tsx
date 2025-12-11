import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

// Navbar component - displayed at the top of every page
// Shows navigation links and user information
function Navbar() {
  // Get authentication context to check if user is logged in
  // This gives us access to user data and the logout function
  const authContext = useContext(AuthContext);

  return (
    // Navigation bar styled with Tailwind CSS classes
    <nav className="bg-gray-800 text-white flex justify-between items-center w-full h-16 px-8">
      {/* Left side - Navigation links */}
      <div className="flex gap-6">
        {/* Home link - always visible */}
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            // Highlight active link in blue, normal links get hover effect
            isActive ? "text-blue-400 font-bold" : "hover:text-blue-300"
          }
        >
          Home
        </NavLink>

        {/* Projects link - only shown if user is logged in */}
        {/* authContext?.user checks if there is a logged-in user */}
        {authContext?.user && (
          <NavLink 
            to="/projects"
            className={({ isActive }) => 
              isActive ? "text-blue-400 font-bold" : "hover:text-blue-300"
            }
          >
            Projects
          </NavLink>
        )}
      </div>

      {/* Right side - User info or login link */}
      <div className="flex gap-6 items-center">
        {authContext?.user ? (
          // If user is logged in, show their username and logout button
          <>
            <span className="text-gray-300">
              Welcome, {authContext.user.username}
            </span>
            <button
              onClick={authContext.logOut} // Call logout function when clicked
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          // If user is NOT logged in, show link to authentication page
          <NavLink 
            to="/auth"
            className={({ isActive }) => 
              isActive ? "text-blue-400 font-bold" : "hover:text-blue-300"
            }
          >
            Sign in / Sign up
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
