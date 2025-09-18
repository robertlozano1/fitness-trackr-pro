import { useState } from "react";
import { useAuth } from "./AuthContext";
// Import useNavigate from react-router-dom for navigation
import { useNavigate } from "react-router-dom";

/** A form that allows users to log into an existing account. */
export default function Login() {
  const { login } = useAuth();
  // useNavigate lets you programmatically change routes
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const tryLogin = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await login({ username, password });
      // After successful login, go to activities page
      navigate("/activities");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Log in to your account</h1>
      <form action={tryLogin}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Login</button>
        {error && <output>{error}</output>}
      </form>
      {/* Use a Link to go to the register page */}
      <a onClick={() => navigate("/register")}>
        Need an account? Register here.
      </a>
    </>
  );
}
