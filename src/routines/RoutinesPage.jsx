import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import RoutineForm from "./RoutineForm";
import { Link } from "react-router-dom";

/**
 * RoutinesPage: Lists all routines and shows a form to create a new routine for logged-in users.
 */
export default function RoutinesPage() {
  const { token } = useAuth();
  const { data: routines, loading, error } = useQuery("/routines");

  if (loading) return <p>Loading routines...</p>;
  if (error) return <p>Error loading routines: {error}</p>;

  return (
    <section>
      <h1>Routines</h1>
      {token && <RoutineForm />}
      <ul>
        {routines?.map((routine) => (
          <li key={routine.id}>
            {/* Link to routine details page */}
            <Link to={`/routines/${routine.id}`}>{routine.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
