import { useParams, useNavigate } from "react-router-dom";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";

/**
 * Page for details about a single activity.
 * Shows activity name, description, and creator name.
 * Uses useParams to get the activity ID from the URL.
 */
export default function ActivityDetails() {
  const { activityId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const {
    data: activity,
    error,
    loading,
  } = useQuery(`/activities/${activityId}`);
  const {
    mutate: deleteActivity,
    loading: deleting,
    error: deleteError,
  } = useMutation("DELETE", `/activities/${activityId}`, ["activities"]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!activity) return <p>Activity not found.</p>;

  const handleDelete = async () => {
    await deleteActivity();
    navigate("/activities");
  };

  return (
    <section>
      <h1>{activity.name}</h1>
      <p>{activity.description}</p>
      <p>Created by: {activity.creatorName}</p>
      {token && (
        <button onClick={handleDelete} disabled={deleting}>
          {deleting
            ? "Deleting..."
            : deleteError
            ? deleteError
            : "Delete Activity"}
        </button>
      )}
    </section>
  );
}
