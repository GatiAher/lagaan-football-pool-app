// Import express
const express = require("express");
// Import books-controller
const gameRoutes = require("../controllers/game-controller.js");

const router = express.Router();
router.get("/all", gameRoutes.gameAll);
router.get("/week/:week", gameRoutes.gameByWeek);
router.put("/update_score", gameRoutes.gameUpdateScore);
router.get("/clear", gameRoutes.gameClear);
router.get("/reset", gameRoutes.gameReset);

module.exports = router;
