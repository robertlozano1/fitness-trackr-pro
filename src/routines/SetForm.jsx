import { useState } from "react";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

/**
 * SetForm: Form to add a set (activity + count) to a routine.
 */
export default function SetForm({ routineId }) {
  const { data: activities, loading: loadingActivities } =
    useQuery("/activities");
  const [error, setError] = useState(null);
  const {
    mutate: addSet,
    loading,
    error: mutationError,
  } = useMutation("POST", "/sets", [`routines/${routineId}`]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.target);
    const activityId = formData.get("activityId");
    const count = formData.get("count");
    try {
      await addSet({ activityId, routineId, count });
      e.target.reset();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a Set</h3>
      <label>
        Activity
        <select name="activityId" required disabled={loadingActivities}>
          <option value="">Select an activity</option>
          {activities?.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Count
        <input name="count" type="number" min="1" required />
      </label>
      <button disabled={loading}>Add Set</button>
      {(error || mutationError) && <output>{error || mutationError}</output>}
    </form>
  );
}
