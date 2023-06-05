// Import the Express framework
const express = require("express");
// Create a new router instance
const router = express.Router();

// Import the userController module
const userController = require("../controllers/userController");
// Import the emailCheck and passwordCheck middleware functions from middlewareFunctions module
const {
  emailCheckMiddleware,
  passwordCheckMiddleware,
  adminPasswordCheckMiddleware
} = require("../middlewares/middlewareFunctions");

// Define a POST route to create a new user and use emailCheckMiddleware as middleware
router.post("/register", emailCheckMiddleware, userController.createUser);

// Define a POST route to log in an existing user and use emailCheck and passwordCheck middleware functions
router.post(
  "/login",
  emailCheckMiddleware,
  passwordCheckMiddleware,
  userController.loginUser
);

// Define a POST route to log in an admin and use emailCheck and passwordCheck middleware functions
router.post(
    "/login/admin",
    adminPasswordCheckMiddleware,
    userController.adminLogin
  );
// Export the router instance for use in other modules
module.exports = router;