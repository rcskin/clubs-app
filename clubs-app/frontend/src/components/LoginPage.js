import React, { useState } from "react";

const LoginPage = ({ handleLogin }) => {
  // Initialize state for the username, password, and whether the user is registering
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [yearGroup, setYearGroup] = useState(0);
  const [pupilName, setPupilName] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email is valid
    if (!username.endsWith("@stc.edu")) {
      alert("User must have a school STC account");
      return;
    }

    // Set the endpoint URL based on whether the user is registering or logging in
    const endpoint = isRegistering
      ? "http://localhost:4000/api/user/register"
      : "http://localhost:4000/api/user/login";

    const body = isRegistering
      ? // Create request body with username, password, and yearGroup properties if registering
        JSON.stringify({ username, password, yearGroup, pupilName })
      : // Create request body with username and password properties if logging in
        JSON.stringify({ username, password });

    // POST request depending on endpoint
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    // Handle errors
    if (!response.ok) {
      const data = await response.json();
      // Log error to console
      console.log(data);
      // Display error message as an alert
      alert(data.error);
    } else {
      // If successful, log in the user or display a success message  in console for registration
      const data = await response.json();
      console.log("success:", data); 
      //store userID in local storage now
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId); //already string values so no need to stringify
      if (isRegistering) {
        // If registering, display the success message and prompt user to log in
        alert("You are now registered! Please log in.");
      } else {
        // If logging in, call handleLogin function to log the user in
        handleLogin();
      }
    }
  };

  return (
    // Render the form with username and password inputs, a submit button, and onSubmit event listener
    <div className="LoginPage-container">
      <form className="LoginPage" onSubmit={handleSubmit}>
        <label htmlFor="pupil-username">Username:</label>
        <input
          type="text"
          id="pupil-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <label htmlFor="pupil-password">Password:</label>
        <input
          type="password"
          id="pupil-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        {/* If registering, render an additional input field for the year group */}
        {isRegistering && (
          <div>
            <label htmlFor="pupil-password">Year Group: </label>
            <input
              type="Number"
              id="pupil-yearGroup"
              value={yearGroup}
              onChange={(e) => setYearGroup(e.target.value)}
              required
            />
            <br />
            <label htmlFor="pupil-name">Name: </label>
            <input
              type="text"
              id="pupil-name"
              value={pupilName}
              onChange={(e) => setPupilName(e.target.value)}
              required
            />
          </div>
        )}
        {/* Render a button that toggles between login and registration modes */}
        <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering
            ? "Already have an account? Login here."
            : "Need to register? Click here."}
        </button>
        {/* Render a submit button with different text depending on the mode (login or registration) */}
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      </form>
    </div>
  );
};

export default LoginPage;

/* Sources:
Task Notes and previous projects
Links from previous projects such as:
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
https://reactjs.org/docs/forms.html
*/
