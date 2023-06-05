// Require Mongoose to create a new schema
const mongoose = require("mongoose");

// Require JSON Web Token to generate an authentication token
const jwt = require("jsonwebtoken");

// Define the User schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  yearGroup: { type: Number, required: true },
  pupilName: { type: String, required: true },
  clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Club" }],
});


// Create a method on the User schema to generate an authentication token
UserSchema.methods.generateAuthToken = function () {
  // Get the user object
  const user = this;
  // Generate a new token using the user's id and username and the JWT_SECRET stored in the environment variables
  const token = jwt.sign(
    { _id: user._id, username: user.username, yearGroup: user.yearGroup }, //payload
    process.env.JWT_SECRET
  );
  // Return the generated token
  return token;
};

// Create a User model using the UserSchema
const User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
