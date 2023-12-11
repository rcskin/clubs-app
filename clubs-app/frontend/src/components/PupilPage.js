// Import necessary libraries
import React, { useEffect, useState } from "react";

// Create the PupilPage functional component
const PupilPage = ({ handleLogout }) => {
  // Initialize state using the useState hook
  const [clubs, setClubs] = useState([]);
  const [joinedClubs, setJoinedClubs] = useState([]);

  // Use the useEffect hook to fetch the clubs data from the server
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch the clubs from the server with token needed from local storage as authentication
    fetch(`https://clubbackend.onrender.com/api/club`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setClubs(data))
      .catch((error) => console.error(error));
  }, [joinedClubs]);

  // Function to sort days of the week in the desired order
  const sortDaysOfWeek = (daysOfWeek) => {
    // Define the desired order of days of the week
    const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    return [...daysOfWeek].sort(
      // Sort the daysOfWeek array based on the desired order
      (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)
    );
  };
  // Initialize an empty object called groups - this object will store the grouped clubs
  const groups = {};
  // Iterate over each club in the clubs array
  for (const club of clubs) {
    // Retrieve the day of the week for the current club
    const dayOfWeek = club.dayOfWeek;
    // If the dayOfWeek key doesn't exist in the groups object, create an empty array for that key
    if (!groups[dayOfWeek]) {
      groups[dayOfWeek] = [];
    }
    // Add the current club to the corresponding dayOfWeek array in the groups object
    groups[dayOfWeek].push(club);
  }
  // Sort the groups by day of the week
  const sortedGroups = {};
  // Iterate over each day of the week in the sorted order
  for (const dayOfWeek of sortDaysOfWeek(Object.keys(groups))) {
    // Assign the corresponding dayOfWeek array from the groups object to the sortedGroups object
    sortedGroups[dayOfWeek] = groups[dayOfWeek];
  }

  // Create a function to join a club
  function handleJoinClub(clubId) {
    // Retrieve the token and userId from localStorage
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    console.log("userId:", userId); // For debugging purposes

    // Send a POST request to join the club with the specified clubId and userId
    fetch(`https://clubbackend.onrender.com/api/club/${clubId}/user/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    })
      .then((response) => {
        if (response.ok) {
          // If the request is successful, update the joinedClubs state by adding the clubId
          setJoinedClubs([...joinedClubs, clubId]);
          alert("You successfully added a club!");
        } else {
          // If the request fails (e.g., already joined), display an alert and log an error
          alert("You have already joined this club!");
          console.error(`Club already added!`);
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error joining club:", error);
      });
  }

  // Render the PupilPage component
  return (
    <div className="pupil-page">
      {/* Add a logout button and call the handleLogout function when clicked */}
      <button className="logout-btn1" onClick={handleLogout}>
        Log Out
      </button>
      <h2>Pupil Dashboard</h2>
      <div>
        <h2>All Clubs - Summer 2023: </h2>
        {/* Iterate over the grouped clubs and display them in a table */}
        {Object.entries(sortedGroups).map(([dayOfWeek, clubs]) => (
          <div key={`${dayOfWeek}-${clubs._id}`}>
            <h2>{dayOfWeek}</h2>
            <table>
              <thead>
                <tr>
                  <th>Club Name</th>
                  <th>Time</th>
                  <th>Room</th>
                  <th>Staff</th>
                  <th>Open To</th>
                  <th>Capacity</th>
                  <th>Join Now!</th>
                </tr>
              </thead>
              <tbody>
                {clubs.map((club) => (
                  <tr key={club._id}>
                    <td>{club.clubName}</td>
                    <td>{club.time}</td>
                    <td>{club.room}</td>
                    <td>{club.staff}</td>
                    <td>{club.openTo.join(", ")}</td>
                    <td>{club.capacity}</td>
                    <td>
                      <button
                        className="join-btn"
                        onClick={() => handleJoinClub(club._id)}
                      >
                        Join!
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the PupilPage component
export default PupilPage;

// Sources:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
// https://www.programiz.com/javascript/library/object/entries
// https://www.w3schools.com/jsref/jsref_join.asp
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
// https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
//https://stackoverflow.com/questions/17892674/sort-array-of-days-in-javascript
