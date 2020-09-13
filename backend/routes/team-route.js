// Import express
const express = require("express");
// Import books-controller
const teamRoutes = require("../controllers/team-controller.js");

const router = express.Router();
router.get("/", teamRoutes.teamAll);

module.exports = router;
