// Import express
const express = require("express");
// Import books-controller
const userRoutes = require("../controllers/user-controller.js");

const router = express.Router();
router.get("/", userRoutes.userGetAll);
router.post("/create", userRoutes.userCreate);
router.get("/username/:username", userRoutes.userGetByUsername);
router.put("/update/username/:username", userRoutes.userUpdateByUsername);
router.put("/update_score", userRoutes.userUpdateScore);
router.put("/update_ranking", userRoutes.userUpdateRanking);
router.put("/delete", userRoutes.userDeleteByUsername);

module.exports = router;
