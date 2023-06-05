// Import the Express framework
const express = require("express");
// Create a new router instance
const router = express.Router();
//import middleware
const {authenticationMiddleware } = require("../middlewares/middlewareFunctions")

// Import the club model
//const Club = require("../models/club");

// Import the controller functions for tasks
const {
  getClubs,
  createClub,
  updateClub,
  deleteClub,
  bookClub,
  getMyClubs,
  deleteMyClub
} = require("../controllers/clubController");
//NEW CODE:
// Define a route to get all clubs 
router.get("/", authenticationMiddleware, getClubs)

// Define a route to add a new club
router.post("/", authenticationMiddleware, createClub);

// Define a route to update a club by ID
router.put("/:id", authenticationMiddleware, updateClub);

// Define a route to delete a club by ID
router.delete("/:id", authenticationMiddleware, deleteClub);

//Routes for users:

// Define a route to delete a booked club by ID
router.delete("/user/:userId/clubs/:clubName", authenticationMiddleware, deleteMyClub);

// Define a route to book a club
router.post("/:clubId/user/:userId", authenticationMiddleware, bookClub);

// Define a route to get booked clubs
router.get("/user/:userId", getMyClubs);

// Export the router instance
module.exports = router;