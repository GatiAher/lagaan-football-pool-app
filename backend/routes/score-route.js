const express = require("express");
const controller = require("../controllers/score-controller");

const router = express.Router();
router.get("/team", controller.recalculateTeamScore);
router.get("/user", controller.recalculateUserScore);

module.exports = router;
