// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
// Import routes
const scoreRouter = require("./routes/score-route");
const gameRouter = require("./routes/generic-route")("Game");
const teamRouter = require("./routes/generic-route")("Team");
const userRouter = require("./routes/generic-route")("User");
// Set default port for express app
const PORT = process.env.PORT || 3001;
console.log("NODE_ENV BACKEND : ", process.env.NODE_ENV);
// Create express app
const app = express();
// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors({ exposedHeaders: ["Content-Range"] }));
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Implement routes
app.use("/score", scoreRouter);
app.use("/game", gameRouter);
app.use("/team", teamRouter);
app.use("/user", userRouter);
// Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something is broken.");
});
// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send("Sorry we could not find that.");
});
// Start express app
app.listen(PORT, function () {
  console.log(`Server is running on: ${PORT}`);
});
