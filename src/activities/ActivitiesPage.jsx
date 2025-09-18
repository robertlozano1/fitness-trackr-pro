import { useState } from "react";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";
/**
 * ActivitiesPage fetches and displays a list of activities from the API.
 * All users can see the list, even if not logged in.
 * If logged in, you can add and delete activities.
 * Uses useQuery to fetch activities and useMutation for create/delete.
 */
export default function ActivitiesPage() {
  // Set up mutation for creating activities
  // useMutation will call POST /activities and refresh the activities list
  const {
    mutate: createActivity,
    error: createError,
    loading: createLoading,
  } = useMutation("POST", "/activities", ["activities"]);

  // Handler for the new activity form submission
  // Called when the user submits the add activity form
  async function handleCreateActivity(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const description = formData.get("description");
    try {
      await createActivity({ name, description });
      e.target.reset();
    } catch (err) {
      // createError state is already set by useMutation; nothing else required
      // but ensure we don't leave an unhandled rejection.
      console.error(err);
    }
  }
  // Set up mutation for deleting activities
  // useMutation will call DELETE /activities/{id} and refresh the activities list
  const { mutate: deleteActivity, loading: deleteLoading } = useMutation(
    "DELETE",
    "/activities",
    ["activities"]
  );
  // Use useQuery to fetch activities from the API
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");

  // Debug logging to help you see what's happening
  console.log("ActivitiesPage: activities", activities);
  console.log("ActivitiesPage: loading", loading);
  console.log("ActivitiesPage: error", error);

  // Use useAuth to check if user is logged in
  const { token } = useAuth();
  // Track per-activity errors so we can show the API message under each item
  const [activityErrors, setActivityErrors] = useState({});

  // Render the activities page UI
  return (
    <>
      <h1>Activities</h1>
      {/* If user is logged in, show form to add a new activity */}
      {token && (
        <form onSubmit={handleCreateActivity} style={{ marginBottom: "1rem" }}>
          <h2>Add a New Activity</h2>
          <label>
            Name
            <input name="name" type="text" required />
          </label>
          <label>
            Description
            <input name="description" type="text" required />
          </label>
          <button disabled={createLoading}>
            {createLoading ? "Adding..." : "Add Activity"}
          </button>
          {/* Show error message if activity creation fails (styled like activity errors) */}
          {createError && <div className="activity-error">{createError}</div>}
        </form>
      )}
      {/* Show loading message while fetching data */}
      {loading && <p>Loading activities...</p>}
      {/* Show error message if something goes wrong */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Per-activity error messages will appear under each activity */}
      {/* Show the list of activities if available */}
      {activities && (
        <ul>
          {activities.map((activity) => (
            <li key={activity.id} className="activity-item">
              {/* Show activity name */}
              <div>{activity.name}</div>
              {/* If user is logged in, show delete button underneath activity name */}
              {token && (
                <div>
                  <button
                    style={{ marginTop: "0.25rem" }}
                    disabled={deleteLoading}
                    onClick={async () => {
                      // Clear any previous error for this activity
                      setActivityErrors((prev) => ({
                        ...prev,
                        [activity.id]: undefined,
                      }));
                      try {
                        await deleteActivity(
                          null,
                          `/activities/${activity.id}`
                        );
                        // Clear error on success
                        setActivityErrors((prev) => {
                          const next = { ...prev };
                          delete next[activity.id];
                          return next;
                        });
                      } catch (e) {
                        const message =
                          (e && e.errorData && e.errorData.message) ||
                          (e && e.message) ||
                          String(e);
                        setActivityErrors((prev) => ({
                          ...prev,
                          [activity.id]: message,
                        }));
                      }
                    }}
                  >
                    {deleteLoading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              )}
              {/* Show per-activity error styled as a small gray box */}
              {activityErrors[activity.id] && (
                <div className="activity-error">
                  {activityErrors[activity.id]}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
