// Import express
const express = require("express");
// Import books-controller
const gameRoutes = require("../controllers/game-controller.js");

const router = express.Router();
router.get("/", gameRoutes.gameAll);
router.get("/week/:week", gameRoutes.gameByWeek);

module.exports = router;
