import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Layout from "./layout/Layout";

import { AuthProvider } from "./auth/AuthContext";
import { ApiProvider } from "./api/ApiContext";
// Import BrowserRouter from react-router-dom
import { BrowserRouter } from "react-router-dom";

// Wrap your app in <BrowserRouter> to enable routing
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ApiProvider>
      <BrowserRouter>
        {/* Layout and App are now inside BrowserRouter for routing */}
        <Layout>
          <App />
        </Layout>
      </BrowserRouter>
    </ApiProvider>
  </AuthProvider>
);
