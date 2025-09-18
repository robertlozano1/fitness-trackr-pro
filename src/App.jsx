// Import React Router components
import { Routes, Route } from "react-router-dom";

import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import ActivityDetails from "./activities/ActivityDetails";
import RoutinesPage from "./routines/RoutinesPage";
import RoutineDetails from "./routines/RoutineDetails";
import Error404 from "./Error404.jsx";
import Layout from "./layout/Layout";

/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */
export default function App() {
  // Use a layout route so all pages share the navigation and layout
  return (
    <Routes>
      {/* Layout route wraps all main pages */}
      <Route path="/" element={<Layout />}>
        {/* Nested routes appear inside <Outlet /> in Layout */}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="activities" element={<ActivitiesPage />} />
        {/* Routines routes */}
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
