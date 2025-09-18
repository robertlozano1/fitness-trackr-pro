import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
// Import Link from react-router-dom for navigation
import { Link } from "react-router-dom";

/** Shows a list of activities. */
export default function ActivityList() {
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");

  if (loading || !activities) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <ul>
      {activities.map((activity) => (
        <ActivityListItem key={activity.id} activity={activity} />
      ))}
    </ul>
  );
}

/** Shows a single activity. Logged-in users will also see a delete button. */
function ActivityListItem({ activity }) {
  const { token } = useAuth();
  const {
    mutate: deleteActivity,
    loading,
    error,
  } = useMutation("DELETE", "/activities/" + activity.id, ["activities"]);

  return (
    <li>
      {/* Link to the details page for this activity */}
      <Link to={`/activities/${activity.id}`}>{activity.name}</Link>
      {/* The delete button will be moved to the details page in the next step */}
    </li>
  );
}
