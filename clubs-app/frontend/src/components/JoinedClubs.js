import { useState, useEffect } from "react";

function JoinedClubs() {
  const [bookedClubs, setBookedClubs] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch the user's booked clubs when the component mounts or when the userId changes
    if (userId) {
      // Make a GET request to retrieve the user's booked clubs based on their userId
      fetch(`http://localhost:4000/api/club/user/${userId}`)
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          console.log(data); // Log the response data for debugging purposes
          setBookedClubs(data); // Update the state with the retrieved booked clubs
        })
        .catch((error) => console.error(error)); // Handle any errors that occur during the request
    }
  }, [userId]); // Execute the effect whenever the userId changes

  const handleDeleteClub = async (userId, clubName) => {
    console.log("club to delete: ", clubName); //debugging purposes - message in console for what was expected to be deleted

    try {
      // Find the club with the specified name - case if clubs have unique name (which they do)
      const clubToDelete = bookedClubs.find(
        (club) => club.clubName === clubName
      );

      if (!clubToDelete) {
        // If the club is not found, send an error message 
        console.error(`Club ${clubName} not found`);
        return;
      }

      // Delete the club from the user's database
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:4000/api/club/user/${userId}/clubs/${clubToDelete.clubName}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setBookedClubs((prevState) => {
          // Create a new array with all the clubs except the one with the specified name
          const updatedClubs = prevState.filter(
            (club) => club.clubName !== clubName
          );
          // Return the updated array
          return updatedClubs;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

   // Function to sort clubs in the desired order
  const sortClubsByDayOfWeek = (clubs) => {
    // Define the desired order of days of the week
    const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    // Sort the dclubs based on the desired order
    return clubs.sort(
      (a, b) => dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek)
    );
  };

  return (
    <div>
      <h2>Joined Clubs</h2>
      <ul>
        {sortClubsByDayOfWeek(bookedClubs).map((club) => (
          <li key={club.clubName}>
            <h3>{club.clubName}</h3>
            <p>
              {club.dayOfWeek} at {club.time}
            </p>
            <p>Room: {club.room}</p>
            <button onClick={() => handleDeleteClub(userId, club.clubName)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JoinedClubs;
