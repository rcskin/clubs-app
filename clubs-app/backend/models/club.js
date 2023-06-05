// Import the Mongoose library
const mongoose = require("mongoose");

// Define a new schema for a club with two fields
const clubSchema = new mongoose.Schema({
  // a required string field for the club description
  dayOfWeek: { type: String, required: true },
  clubName: { type: String, required: true },
  time: { type: String, required: true },
  room: { type: String, required: true },
  staff: { type: String, required: true },
  openTo: { type: [Number], required: true },
  capacity: { type: Number, default: 0 },
});

// Create a new Mongoose model for a club, based on the club schema
const Club = mongoose.model("Club", clubSchema);

// Export the Club model to be used in other parts of the application
module.exports = Club;

// Sources:
// https://mongoosejs.com/docs/schematypes.html#arrays
