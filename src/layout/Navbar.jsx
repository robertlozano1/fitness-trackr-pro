import { useAuth } from "../auth/AuthContext";
// Import Link from react-router-dom for navigation
import { Link } from "react-router-dom";

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  // Use <Link> for navigation instead of setPage
  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        {/* Link to activities page */}
        <Link to="/activities">Activities</Link>
        {/* Link to routines page */}
        <Link to="/routines">Routines</Link>
        {token ? (
          // Log out still uses a button since it's an action
          <button onClick={logout}>Log out</button>
        ) : (
          <>
            {/* Link to register page */}
            <Link to="/register">Register</Link>
            {/* Link to login page */}
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}
