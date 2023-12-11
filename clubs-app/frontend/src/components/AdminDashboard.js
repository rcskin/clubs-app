import React, { useState, useEffect } from "react";

const AdminDashboard = ({ handleLogout }) => {
  // State variables
  const [formData, setFormData] = useState({
    dayOfWeek: "",
    clubName: "",
    time: "",
    room: "",
    staff: "",
    openTo: [],
    capacity: 0,
  });
  const [clubs, setClubs] = useState([]);
  const [editingClub, setEditingClub] = useState(null);

  // Destructuring form data
  const { dayOfWeek, clubName, time, room, staff, openTo, capacity } = formData;

  // Function to handle form input changes
  const onChange = (e) => {
    if (e.target.name === "openTo") {
      // If the input field is 'openTo', convert the comma-separated values into an array of numbers
      setFormData({
        ...formData,
        [e.target.name]: e.target.value.split(",").map((item) => +item),
      });
    } else {
      // For other input fields, update the form data with the new value
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Use the useEffect hook to fetch the clubs data from the server
  useEffect(() => {
    const token = localStorage.getItem("token");
    // Fetch the clubs from the server
    fetch(`https://clubbackend.onrender.com/api/club`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setClubs(data))
      .catch((error) => console.error(error));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      // Get the authentication token from local storage
      const token = localStorage.getItem("token");

      // Send a POST request to add a new club
      const response = await fetch("https://clubbackend.onrender.com/api/club", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      // Parse the response data
      const data = await response.json();

      // Update the clubs state with the newly added club
      setClubs([...clubs, data]);

      // Reset the form data to empty values
      setFormData({
        dayOfWeek: "",
        clubName: "",
        time: "",
        room: "",
        staff: "",
        openTo: [],
        capacity: 0,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Function to sort days of the week in the desired order
  const sortDaysOfWeek = (daysOfWeek) => {
    // Define the desired order of days of the week
    const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    // Sort the daysOfWeek array based on the desired order
    return [...daysOfWeek].sort(
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

  const handleDelete = (id) => {
    console.log("Deleting club with ID:", id);
    const token = localStorage.getItem("token");
    fetch(`https://clubbackend.onrender.com/api/club/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Remove the deleted club from the list of clubs
        const updatedClubs = clubs.filter((club) => club._id !== id);
        setClubs(updatedClubs);
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = (club) => {
    setEditingClub(club);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://clubbackend.onrender.com/api/club/${editingClub._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editingClub),
        }
      );
      const data = await response.json();
      // Update the clubs array with the edited club
      const updatedClubs = clubs.map((club) =>
        club._id === data._id ? data : club
      );
      setClubs(updatedClubs);
      setEditingClub(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Hello Admin!</h1>
      <button className="logout-btn2" onClick={handleLogout}>
        Log Out
      </button>
      <h2>Add Club</h2>
      <form className="create-club-form">
        <div>
          <label>Day of Club: </label>
          <input
            type="text"
            placeholder="dayOfWeek"
            name="dayOfWeek"
            value={dayOfWeek}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <label>Name of Club: </label>
          <input
            type="text"
            placeholder="clubName"
            name="clubName"
            value={clubName}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <label>Time of Club: </label>
          <input
            type="text"
            name="time"
            placeholder="Time"
            value={time}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <label>Room: </label>
          <input
            type="text"
            name="room"
            placeholder="Room"
            value={room}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <label>Staff initials: </label>
          <input
            type="text"
            name="staff"
            placeholder="Staff"
            value={staff}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <label>Open To: </label>
          <input
            type="text"
            name="openTo"
            placeholder="Year Group (separate with commas)"
            value={openTo}
            onChange={(e) =>
              setFormData({
                ...formData,
                [e.target.name]: e.target.value.split(","),
              })
            }
            required
          />
        </div>
        <div>
          <label>Capacity: </label>
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <button onClick={handleAdd}>Add Club</button>
      </form>
      <div>
        <h2>All Clubs: </h2>
        {Object.entries(sortedGroups).map(([dayOfWeek, clubs], i) => (
          <div className="club-table" key={i}>
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
                  <th>Amend</th>
                </tr>
              </thead>
              <tbody>
                {clubs.map((club) => (
                  <tr key={club._id}>
                    {editingClub && editingClub._id === club._id ? (
                      <td>
                        <input
                          type="text"
                          value={editingClub.clubName}
                          onChange={(e) =>
                            setEditingClub({
                              ...editingClub,
                              clubName: e.target.value,
                            })
                          }
                        />
                      </td>
                    ) : (
                      <td>{club.clubName}</td>
                    )}
                    {editingClub && editingClub._id === club._id ? (
                      <td>
                        <input
                          type="text"
                          value={editingClub.time}
                          onChange={(e) =>
                            setEditingClub({
                              ...editingClub,
                              time: e.target.value,
                            })
                          }
                        />
                      </td>
                    ) : (
                      <td>{club.time}</td>
                    )}
                    {editingClub && editingClub._id === club._id ? (
                      <td>
                        <input
                          type="text"
                          value={editingClub.room}
                          onChange={(e) =>
                            setEditingClub({
                              ...editingClub,
                              room: e.target.value,
                            })
                          }
                        />
                      </td>
                    ) : (
                      <td>{club.room}</td>
                    )}
                    {editingClub && editingClub._id === club._id ? (
                      <td>
                        <input
                          type="text"
                          value={editingClub.staff}
                          onChange={(e) =>
                            setEditingClub({
                              ...editingClub,
                              staff: e.target.value,
                            })
                          }
                        />
                      </td>
                    ) : (
                      <td>{club.staff}</td>
                    )}
                    {editingClub && editingClub._id === club._id ? (
                      <td>
                        <input
                          type="text"
                          value={editingClub.openTo.join(",")}
                          onChange={(e) =>
                            setEditingClub({
                              ...editingClub,
                              openTo: e.target.value
                                .split(",")
                                .map((item) => item.trim()),
                            })
                          }
                        />
                      </td>
                    ) : (
                      <td>{club.openTo.join(", ")}</td>
                    )}

                    {editingClub && editingClub._id === club._id ? (
                      <td>
                        <input
                          type="text"
                          value={editingClub.capacity}
                          onChange={(e) =>
                            setEditingClub({
                              ...editingClub,
                              capacity: e.target.value,
                            })
                          }
                        />
                      </td>
                    ) : (
                      <td>{club.capacity}</td>
                    )}

                    <td>
                      <button
                        className="amend-btn"
                        onClick={() => handleEdit(club)}
                      >
                        Edit
                      </button>
                      <button
                        className="amend-btn"
                        onClick={() => handleDelete(club._id)}
                      >
                        Delete
                      </button>
                      {editingClub && editingClub._id === club._id && (
                        <button className="amend-btn" onClick={handleSave}>
                          Save
                        </button>
                      )}
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

export default AdminDashboard;

/* Sources:
https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
*/
