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

  // Debug: log activities to the console
  console.log("activities:", activities);
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
  // Only link to the details page for this activity
  return (
    <li>
      <Link to={`/activities/${activity.id}`}>{activity.name}</Link>
    </li>
  );
}
