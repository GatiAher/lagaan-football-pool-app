const express = require("express");
const updateScoreController = require("../controllers/update-score-controller");

const router = express.Router();
router.put("/update_scores", updateScoreController.updateScore);

module.exports = router;
