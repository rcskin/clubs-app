import React, { useState } from "react";

const AdminLoginForm = ({ handleLogin }) => {
  // Initialize state for the username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set the endpoint URL for the admin login
    const endpoint = "http://localhost:4000/api/user/login/admin";

    // Send a POST request to the server with the username and password
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    // Handle errors
    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      alert(data.error);
    } else {
      // If successful, log in the user
      const data = await response.json();
      console.log("success:", data);
      localStorage.setItem("token", data.token);
      handleLogin();
    }
  };

  return (
    // Render the form with username and password inputs and a submit button
    <div className="admin-container">
      <h3>Admin Login</h3>
      <form className="admin" onSubmit={handleSubmit}>
        <label htmlFor="admin-username">Admin Username:</label>
        <input
          type="text"
          id="admin-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <label htmlFor="admin-password">Admin Password:</label>
        <input
          type="password"
          id="admin-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLoginForm;
