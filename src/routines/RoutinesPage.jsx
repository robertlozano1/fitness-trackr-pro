import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import RoutineForm from "./RoutineForm";
import { Link } from "react-router-dom";

/**
 * RoutinesPage: Lists all routines and shows a form to create a new routine for logged-in users.
 * Uses useQuery to fetch routines from the API.
 * Shows a message if no routines are found.
 */
export default function RoutinesPage() {
  const { token } = useAuth();
  const { data: routines, loading, error } = useQuery("/routines");

  // Debug logging to help you see what's happening
  console.log("RoutinesPage: routines", routines);
  console.log("RoutinesPage: loading", loading);
  console.log("RoutinesPage: error", error);

  // Show loading or error messages if needed
  if (loading) return <p>Loading routines...</p>;
  if (error) return <p>Error loading routines: {error}</p>;

  // Render the routines page UI
  return (
    <section>
      <h1>Routines</h1>
      {token && <RoutineForm />}
      <ul>
        {Array.isArray(routines) && routines.length > 0 ? (
          routines.map((routine) => (
            <li key={routine.id}>
              {/* Link to routine details page */}
              <Link to={`/routines/${routine.id}`}>{routine.name}</Link>
            </li>
          ))
        ) : (
          <li>No routines found.</li>
        )}
      </ul>
    </section>
  );
}
