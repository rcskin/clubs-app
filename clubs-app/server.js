// Require the necessary dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

// Create an instance of the Express application
const app = express();

// Set the port number for the server
const port = 4000;

// Use the body-parser middleware to parse incoming JSON data
app.use(bodyParser.json());

// Use the helmet middleware for enhanced security
app.use(helmet());

// Use the cors middleware to allow cross-origin requests
app.use(cors());

// Set the JWT_SECRET environment variable
process.env.JWT_SECRET = "secret-key";

// Connect to MongoDB Atlas using the Mongoose library
mongoose
  .connect("mongodb+srv://cluster2.fvarrjz.mongodb.net/myFirstDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: "skinnerrachelc",
    pass: "clubs123",
  })
  // If connection is successful, log a message
  .then(() => console.log("MongoDB Connected"))
  // If an error occurs, log the error message
  .catch((err) => console.log(err));

// Require the user router and use it in the application
const userRouter = require("./backend/routes/userRoutes");
app.use("/api/user", userRouter);

// Require the task router and use it in the application
const clubRouter = require("./backend/routes/clubRoutes");
app.use("/api/club", clubRouter);

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => console.log(`Server running on port ${port}`));
