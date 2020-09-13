const express = require("express");
const adminRoutes = require("../controllers/admin-controller.js");

const router = express.Router();
router.put("/update_scores", adminRoutes.updateScore);
router.get("/game_clear_all", adminRoutes.gameClearAll);
router.get("/user_clear_all", adminRoutes.userClearAll);
router.get("/team_reset_all", adminRoutes.teamResetAll);
router.get("/game_reset_all", adminRoutes.gameResetAll);

module.exports = router;
