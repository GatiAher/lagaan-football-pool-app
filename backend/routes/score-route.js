const express = require("express");
const controller = require("../controllers/score-controller");

const router = express.Router();
router.put("/", controller.updateScore);

module.exports = router;
