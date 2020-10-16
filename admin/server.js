// Import dependencies
const express = require("express");

var path = require("path");

// Set default port for express app
const PORT = process.env.PORT || 3002;
// Create express app
const app = express();

// Build directory usage
app.use(express.static(path.join(__dirname, "build")));

if (process.env.NODE_ENV === "production") {
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}
console.log("NODE_ENV ADMIN : ", process.env.NODE_ENV);

// Start express app
app.listen(PORT, function () {
  console.log(`Frontend server is running on: ${PORT}`);
});
