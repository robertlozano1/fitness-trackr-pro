import Navbar from "./Navbar";
// Import Outlet from react-router-dom for nested routing
import { Outlet } from "react-router-dom";

/**
 * Layout component provides the shared navigation and main content area for all pages.
 * <Navbar /> is always shown at the top.
 * <Outlet /> is where the current page's content will be rendered based on the route.
 */
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
