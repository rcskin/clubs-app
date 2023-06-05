import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import PupilPage from "./components/PupilPage";
import LoginPage from "./components/LoginPage";
import AdminLoginForm from "./components/AdminLoginForm";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import JoinedClubs from "./components/JoinedClubs";

const App = () => {
  // State variables to keep track of user login status and admin status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to handle login
  // Takes a boolean isAdmin parameter to determine if the user is an admin
  const handleLogin = (isAdmin) => {
    // Set isLoggedIn to true
    setIsLoggedIn(true);
    // Set isAdmin based on the provided parameter
    setIsAdmin(isAdmin);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Set isLoggedIn to false
    setIsLoggedIn(false);
    // Set isAdmin to false
    setIsAdmin(false);
  };

  return (
    <div>
      {/* Render the Header component */}
      <Header />
      <div className="app-container">
        {isLoggedIn ? ( // If user is logged in
          isAdmin ? ( // If user is an admin
            <AdminDashboard handleLogout={handleLogout} /> // Render the AdminDashboard component
          ) : (
            <>
              {" "}
              {/* If user is not an admin */}
              <NavBar /> {/* Render the NavBar component */}
              <Routes>
                {" "}
                {/* Render the Routes component */}
                <Route
                  exact
                  path="/"
                  element={<PupilPage handleLogout={handleLogout} />}
                />{" "}
                {/* Render the PupilPage component */}
                <Route
                  exact
                  path="/joined-clubs"
                  element={<JoinedClubs />}
                />{" "}
                {/* Render the JoinedClubs component */}
              </Routes>
            </>
          )
        ) : (
          <>
            {" "}
            {/* If user is not logged in */}
            <LoginPage handleLogin={handleLogin} />{" "}
            {/* Render the LoginPage component */}
            <AdminLoginForm handleLogin={() => handleLogin(true)} />{" "}
            {/* Render the AdminLoginForm component */}
          </>
        )}
      </div>
    </div>
  );
};

export default App;

/* Notes:
By using the isAdmin parameter in the handleLogin function, the app can differentiate between 
regular users (pupils) and the admin user. It displays different content based on 
the users in the application
*/
