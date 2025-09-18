// Entry point for the React app
// StrictMode helps catch potential problems in development
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// AuthProvider gives access to authentication state (logged in/out)
import { AuthProvider } from "./auth/AuthContext";
// ApiProvider gives access to API functions and attaches auth token
import { ApiProvider } from "./api/ApiContext";
// BrowserRouter enables navigation and routing in the app
import { BrowserRouter } from "react-router-dom";

// Render the app inside the root element
// Providers wrap the app to give access to auth and API context
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ApiProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApiProvider>
    </AuthProvider>
  </StrictMode>
);
