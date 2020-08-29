// Import express
const express = require("express");
const testRouter = require("../web-scrapping/schedule-scrapper.js");
// Create router
const router = express.Router();
// Add route for GET request to retrieve all book
// In server.js, books route is specified as '/books'
// this means that '/all' translates to '/books/all'
router.get("/test", testRouter);
module.exports = router;
