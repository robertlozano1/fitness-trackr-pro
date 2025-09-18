import Navbar from "./Navbar";
// Import Outlet from react-router-dom for nested routing
import { Outlet } from "react-router-dom";

/** The shared layout for all pages of the app */
export default function Layout() {
  // Use <Outlet /> to render child routes inside the layout
  return (
    <>
      <Navbar />
      <main>
        {/* This is where nested route content will appear */}
        <Outlet />
      </main>
    </>
  );
}
