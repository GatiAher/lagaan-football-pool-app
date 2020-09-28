// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
// Import routes
const updateScoreRouter = require("./routes/update-score-route");
const raGameRouter = require("./routes/ra-route")("GAME");
const raTeamRouter = require("./routes/ra-route")("TEAM");
const raUserRouter = require("./routes/ra-route")("USER");
// Set default port for express app
const PORT = process.env.PORT || 3001;
// Create express app
const app = express();
// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Implement routes
app.use("/updatescore", updateScoreRouter);
app.use("/ragame", raGameRouter);
app.use("/rateam", raTeamRouter);
app.use("/rauser", raUserRouter);
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
