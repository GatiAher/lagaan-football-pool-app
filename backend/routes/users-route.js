// Import express
const express = require("express");
// Import books-controller
const userRoutes = require("../controllers/user-controller.js");

const router = express.Router();
router.get("/", userRoutes.userGetAll);
router.post("/create", userRoutes.userCreate);
router.get("/id/:user_id", userRoutes.userGetByUserId);
router.put("/update/id/:user_id", userRoutes.userUpdateByUserId);
router.put("/update_score", userRoutes.userUpdateScore);
router.put("/update_ranking", userRoutes.userUpdateRanking);
router.put("/delete", userRoutes.userDeleteByUserId);
router.get("/delete_all", userRoutes.userDeleteAll);
router.get("/ranked", userRoutes.userGetInOrderOfScore);
module.exports = router;