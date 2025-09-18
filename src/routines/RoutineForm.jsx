import { useState } from "react";
import useMutation from "../api/useMutation";

/**
 * RoutineForm: Form to create a new routine (name + goal).
 */
export default function RoutineForm() {
  const [error, setError] = useState(null);
  const {
    mutate: createRoutine,
    loading,
    error: mutationError,
  } = useMutation("POST", "/routines", ["routines"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const goal = formData.get("goal");
    try {
      await createRoutine({ name, goal });
      e.target.reset();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Routine</h2>
      <label>
        Name
        <input name="name" required />
      </label>
      <label>
        Goal
        <input name="goal" required />
      </label>
      <button disabled={loading}>Create</button>
      {(error || mutationError) && <output>{error || mutationError}</output>}
    </form>
  );
}
