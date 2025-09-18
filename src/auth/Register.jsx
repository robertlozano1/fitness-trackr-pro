import { useState } from "react";
import { useAuth } from "./AuthContext";
// Import useNavigate from react-router-dom for navigation
import { useNavigate } from "react-router-dom";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();
  // useNavigate lets you programmatically change routes
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const tryRegister = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await register({ username, password });
      // After successful registration, go to activities page
      navigate("/activities");
    } catch (e) {
      setError(e.message);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    await tryRegister(formData);
  }

  return (
    <>
      <h1>Register for an account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Register</button>
        {error && <output>{error}</output>}
      </form>
      {/* Use a Link to go to the login page */}
      <a onClick={() => navigate("/login")}>
        Already have an account? Log in here.
      </a>
    </>
  );
}
