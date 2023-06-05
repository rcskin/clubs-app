// Import the User model to access the user collection in the database
const User = require("../models/user");
// Require JSON Web Token to generate an authentication token
const jwt = require("jsonwebtoken");

// Handle POST request to create a new user
exports.createUser = async (req, res) => {
  // Extract the username and password from the request body
  const { username, password, yearGroup, pupilName } = req.body;

  // Create a new user object using the extracted username and password
  const user = new User({ username, password, yearGroup, pupilName });

  try {
    // Save the new user object to the database
    await user.save();
    // Generate an authentication token for the user
    const token = user.generateAuthToken();

    // Log the new user object to the console
    console.log("New pupil account created:", user);

    // Return a success response with the new user object and token
    res.status(201).send({ user, token });
  } catch (error) {
    // Handle any errors that occur while creating the new user
    console.error("Error creating user:", error);
    // Return an error response with the error message
    res.status(400).send(error);
  }
};

// POST request to log in an existing user
exports.loginUser = async (req, res) => {
  // Extract the username and password from the request body
  const { username, password } = req.body;

  try {
    // Find the user with the matching username in the database
    const user = await User.findOne({ username });
    console.log("testing", user); //debugging

    // If user is not found, return an error response
    if (!user) {
      return res.status(401).send({ error: "Invalid username." });
    }
    // If the user's password does not match the provided password, return an error response
    if (user.password !== password) {
      return res.status(401).send({ error: "Invalid password." });
    }

    // Generate a token for the user
    const token = user.generateAuthToken();

    // Return a success response with the username, user ID, and token
    res.send({
      username: user.username,
      userId: user._id,
      token,
      yearGroup: user.yearGroup,
    }); //yearGroup: user.yearGroup } to add
  } catch (error) {
    // Handle any errors that occur while logging in the user
    console.error("Error logging in user:", error);
    // Return an error response with the error message
    res.status(500).send(error);
  }
};

// Create admin login + sending it to
exports.adminLogin = async (req, res) => {
  // Extract the username and password from the request body
  const { username, password } = req.body;
  console.log(req.body);
  try {
    // Hardcode the username and password for the admin
    const adminUsername = "admin@stc.edu";
    const adminPassword = "admin123";

    // Check if the provided username and password match the hardcoded admin credentials
    if (username !== adminUsername || password !== adminPassword) {
      return res.status(401).send({ error: "Invalid username or password!" });
    }

    // Generate an authentication token for the admin
    const token = jwt.sign({ userId: "admin_id" }, process.env.JWT_SECRET); // Sign the token with the secret key
    console.log(token);
    // Return a success response with the username, user ID, and token
    res.send({ username: adminUsername, userId: "admin_id", token });
  } catch (error) {
    // Handle any errors that occur while logging in the admin user
    console.error("Error logging in admin:", error);
    // Return an error response with the error message
    res.status(500).send(error);
  }
};
