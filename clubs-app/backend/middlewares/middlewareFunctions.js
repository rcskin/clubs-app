// Create a middleware function that checks if the user's email is valid and registered.
const emailCheckMiddleware = (req, res, next) => {
  const { username } = req.body;

  // Check if email is valid
  if (!username.endsWith("@stc.edu")) {
    // If the email is not valid, send a 403 error response
    return res.status(403).send({ error: "User must have an STC account" });
  }
  next();
};

// Create a middleware function that checks if the password is valid
const passwordCheckMiddleware = (req, res, next) => {
  const { password } = req.body;

  // Check if password is valid
  if (!password) {
    // If the password is not valid, send a 403 error response
    return res.status(403).send({ error: "Incorrect password" });
  }
  next();
};

// Create a middleware function that checks if the password is valid
const adminPasswordCheckMiddleware = (req, res, next) => {
  const { password } = req.body;

  // Check if adminPassword is valid
  if (!password) {
    // If the password is not valid, send a 403 error response
    return res.status(403).send({ error: "Incorrect password" });
  }
  next();
};

// Middleware function to verify the authentication token

const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  const auth = req.headers["authorization"];

  // Check if the token exists
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).send({ error: "Access denied. Token missing." });
  }

  const token = auth.split(" ")[1];

  try {
    // Verify and decode the token using the JWT_SECRET stored in the environment variables
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user is an admin based on the decoded token's user ID
    const isAdmin = decodedToken.userId === "admin_id"; 

    if (isAdmin) {
      // Handle admin role
      req.user = {
        userId: decodedToken.userId,
        username: "admin@stc.edu", 
      };
    } else {
      // Handle pupil user
      req.user = {
        userId: decodedToken.userId,
        username: decodedToken.username,
        yearGroup: decodedToken.yearGroup,
      };
    }

    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(401).send({ error: "Invalid token." });
  }
};

module.exports = {
  emailCheckMiddleware,
  passwordCheckMiddleware,
  adminPasswordCheckMiddleware,
  authenticationMiddleware,
};
