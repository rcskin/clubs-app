// Import the Task model
const Club = require("../models/club");
const User = require("../models/user");

// Async function to get all clubs from the database

exports.getClubs = async (req, res) => {
  try {
    console.log("User:", req.user);

    if (req.user.username === "admin@stc.edu") {
      // If the user is an admin, fetch all clubs
      const clubs = await Club.find();
      res.send(clubs);
    } else {
      // If the user is a regular user, fetch clubs based on the user's year group
      const clubs = await Club.find({
        openTo: req.user.yearGroup,
      });
      console.log("filtered clubs", clubs); //debugging
      res.send(clubs);
    }
  } catch (err) {
    res.status(500).send({ error: "Error getting clubs" });
  }
};

// Async function to create a new club in the database
exports.createClub = async (req, res) => {
  // Extract the club from the request body
  const { dayOfWeek, clubName, time, room, staff, openTo, capacity } = req.body;
  try {
    // Create a new club in the database using the club model
    const newClub = await Club.create({
      dayOfWeek,
      clubName,
      time,
      room,
      staff,
      openTo,
      capacity,
    });
    // Send the created club in the response
    res.send(newClub);
  } catch (err) {
    // If an error occurs, send an error message in the response
    res.status(500).send({ error: "Error creating club" });
  }
};

// Async function to update an existing club in the database
exports.updateClub = async (req, res) => {
  // Extract the club ID from the request parameters
  const { id } = req.params;
  //
  const { dayOfWeek, clubName, time, room, staff, openTo, capacity } = req.body;
  try {
    // Find the club by ID and update it in the database using the club model
    const updatedClub = await Club.findByIdAndUpdate(
      id,
      { dayOfWeek, clubName, time, room, staff, openTo, capacity },
      { new: true }
    );
    // Send the updated club in the response
    res.send(updatedClub);
  } catch (err) {
    // If an error occurs, send an error message in the response
    res.status(500).send({ error: "Error updating club" });
  }
};

// Async function to delete a club from the database
exports.deleteClub = async (req, res) => {
  // Extract the club ID from the request parameters
  const clubId = req.params?.id;

  // Log the user ID and club ID for debugging purposes
  console.log("clubId:", clubId);

  try {
    // Delete the club from the database
    await Club.findByIdAndRemove(clubId);

    // Send a success message in the response
    res.send({ message: "Club deleted successfully" });
  } catch (err) {
    // If an error occurs, send an error message in the response
    res.status(500).send({ error: "Error deleting club" });
  }
};

// Async function to book a club from the database
exports.bookClub = async (req, res) => {
  // Extract the user ID and club ID from the request parameters
  const userId = req.params?.userId;
  const clubId = req.params?.clubId;

  // Log the user ID and club ID for debugging purposes
  console.log("userId:", userId);
  console.log("clubId:", clubId);

  try {
    // Find the club by ID
    const club = await Club.findById(clubId);

    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }

    // Check if the club has available capacity
    if (club.capacity <= 0) {
      return res.status(400).json({ error: "Club is already full" });
    }

    // Reduce the club's capacity by 1
    club.capacity -= 1;

    // Save the updated club
    await club.save();
    // Find the user by ID
    const user = await User.findById(userId);

    // Log the user object for debugging purposes
    console.log("user:", user);

    // Check if the user has already joined the club
    if (user?.clubs.includes(clubId)) {
      console.log(`User ${userId} has already joined club ${clubId}`);

      // If the user has already joined the club, send a 400 Bad Request response
      res.status(400).send("You have already joined this club.");
      return;
    }

    // Add the club ID to the user's list of clubs
    user?.clubs.push(clubId);

    // Save the user object
    await user?.save();

    // If the user has successfully booked the club, send a 200 OK response
    console.log("Club booked successfully.");
    res.status(200).send("Club booked successfully.");
  } catch (error) {
    // If an error occurs, log the error and send a 500 Internal Server Error response
    console.error("Error booking club:", error);
    res.status(500).send("Error booking club.");
  }
};

// Get all clubs that a user with a given user ID has booked
exports.getMyClubs = async (req, res) => {
  const userId = req.params?.userId;

  try {
    // Find the user with the given user ID in the database, and populate the "clubs" field with the following properties
    const user = await User.findById(userId).populate({
      path: "clubs",
      select: "dayOfWeek clubName time room staff -_id", // Include only these properties in the "clubs" field of the user object
    });

    // Extract the "clubs" field from the user object
    const bookedClubs = user.clubs;

    // Return the booked clubs in the response with a 200 OK status
    res.status(200).send(bookedClubs);
  } catch (error) {
    // If there is an error retrieving the user or clubs, send a 500 Internal Server Error status with an error message
    res.status(500).send("Error getting booked clubs.");
  }
};

// Async function to delete a club from the database
exports.deleteMyClub = async (req, res) => {
  // Extract the user ID and club name from the request parameters
  const { userId, clubName } = req.params;
  console.log(clubName);

  try {
    // Increment the club's capacity by 1
    const clubs = await Club.findOneAndUpdate(
      { clubName: clubName },
      { $inc: { capacity: 1 } }
    );
    console.log("club to increment", clubs);
    await clubs.save();

    // Find the user by ID and populate their clubs array with club documents
    const user = await User.findById(userId).populate("clubs");

    // Find the club to remove in the clubs array
    const clubToRemove = user.clubs.find((club) => club.clubName === clubName);

    // If the club is not found in the clubs array, send an error message
    if (!clubToRemove) {
      return res.status(404).send({ error: "Club not found" });
    }

    // Remove the club from the clubs array
    user.clubs = user.clubs.filter((club) => club !== clubToRemove);
    console.log(user.clubs);
    // Update the user document in the database
    await user.save();

    // Send a success message in the response
    res.send({ message: "Club deleted successfully" });
  } catch (err) {
    // If an error occurs, send an error message in the response
    res.status(500).send({ error: "Error deleting club" });
  }
};

/* Sources:
https://mongoosejs.com/docs/api/model.html#model_Model.findById
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
https://mongoosejs.com/docs/api/model.html#model_Model-save
https://developer.mozilla.org/en-US/docs/Web/HTTP/Status 
*/
