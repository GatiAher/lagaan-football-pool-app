const express = require("express");
const controller = require("../controllers/info-controller");

const router = express.Router();
router.get("/kickoff", controller.getKickoffDate);

module.exports = router;
