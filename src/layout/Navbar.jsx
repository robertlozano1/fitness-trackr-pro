// Import useAuth to get authentication state and logout function
import { useAuth } from "../auth/AuthContext";
// Import NavLink from react-router-dom for navigation between pages
import { NavLink } from "react-router-dom";

/**
 * Navbar component displays navigation links for the app.
 * Shows links to Activities, Routines, Register, and Login.
 * If the user is logged in, shows a Log out button instead.
 */
export default function Navbar() {
  const { token, logout } = useAuth();
  // Use <Link> for navigation instead of setPage
  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        {/* NavLink highlights the active page */}
        <NavLink
          to="/activities"
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          Activities
        </NavLink>
        <NavLink
          to="/routines"
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          Routines
        </NavLink>
        {token ? (
          // Log out still uses a button since it's an action
          <button onClick={logout}>Log out</button>
        ) : (
          <>
            {/* NavLink to register page */}
            <NavLink
              to="/register"
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              Register
            </NavLink>
            {/* NavLink to login page */}
            <NavLink
              to="/login"
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              Login
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
