// Import express
const express = require("express");
// Import books-controller
const teamRoutes = require("../controllers/team-controller.js");

const router = express.Router();
router.get("/", teamRoutes.teamGetAll);
router.get("/reset", teamRoutes.teamReset);

module.exports = router;
