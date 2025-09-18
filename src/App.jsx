// Import React Router components for navigation and routing
import { Routes, Route } from "react-router-dom";

// Import all main page components
import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import Error404 from "./Error404.jsx";
import ActivityDetails from "./activities/ActivityDetails.jsx";
import Layout from "./layout/Layout";
import RoutinesPage from "./routines/RoutinesPage.jsx";
import RoutineDetails from "./routines/RoutineDetails.jsx";

/**
 * App component sets up all routes for the app using React Router.
 * The Layout route wraps all main pages so navigation and layout are shared.
 * Each <Route> maps a URL path to a page component.
 */
export default function App() {
  // Use a layout route so all pages share the navigation and layout
  return (
    <Routes>
      {/* Layout route wraps all main pages and provides navigation */}
      <Route path="/" element={<Layout />}>
        {/* Nested routes appear inside <Outlet /> in Layout */}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="activities" element={<ActivitiesPage />} />
        {/* Routines routes for list and details */}
        <Route path="routines" element={<RoutinesPage />} />
        <Route path="routines/:routineId" element={<RoutineDetails />} />
        {/* Dynamic route for single activity details */}
        <Route path="activities/:activityId" element={<ActivityDetails />} />
        {/* Catch-all route for 404 errors */}
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
