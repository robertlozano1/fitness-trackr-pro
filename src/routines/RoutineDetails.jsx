import { useParams, useNavigate } from "react-router-dom";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";
import SetForm from "./SetForm";

/**
 * RoutineDetails: Shows details for a single routine, sets, and forms for adding/deleting.
 */
export default function RoutineDetails() {
  const { routineId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const { data: routine, loading, error } = useQuery(`/routines/${routineId}`);
  const {
    mutate: deleteRoutine,
    loading: deleting,
    error: deleteError,
  } = useMutation("DELETE", `/routines/${routineId}`, ["routines"]);

  const handleDelete = async () => {
    try {
      await deleteRoutine();
      navigate("/routines");
    } catch (err) {}
  };

  if (loading) return <p>Loading routine...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!routine) return <p>Routine not found.</p>;

  return (
    <section>
      <h1>{routine.name}</h1>
      <p>Goal: {routine.goal}</p>
      <p>Created by: {routine.creatorName}</p>
      {token && (
        <button onClick={handleDelete} disabled={deleting}>
          {deleting
            ? "Deleting..."
            : deleteError
            ? deleteError
            : "Delete Routine"}
        </button>
      )}
      <h2>Sets</h2>
      {routine.sets?.length ? (
        <ul>
          {routine.sets.map((set) => (
            <li key={set.id}>
              {set.activityName} - {set.count} reps
              {token && (
                <DeleteSetButton routineId={routineId} setId={set.id} />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No sets yet. {token && "Add a set below!"}</p>
      )}
      {token && <SetForm routineId={routineId} />}
    </section>
  );

  function DeleteSetButton({ routineId, setId }) {
    // Use correct endpoint: DELETE /sets/{id}
    const {
      mutate: deleteSet,
      loading: setLoading,
      error: setError,
    } = useMutation("DELETE", `/sets/${setId}`, [`routines/${routineId}`]);
    const handleDelete = async () => {
      await deleteSet();
    };
    return (
      <button onClick={handleDelete} disabled={setLoading}>
        {setLoading ? "Deleting..." : setError ? setError : "Delete Set"}
      </button>
    );
  }
}
