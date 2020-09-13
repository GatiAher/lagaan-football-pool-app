// Import express
const express = require("express");
// Import books-controller
const userRoutes = require("../controllers/user-controller.js");

const router = express.Router();
router.get("/", userRoutes.userAll);
router.get("/ranked", userRoutes.userAllOrderOfScore);
router.get("/id/:user_id", userRoutes.userByUserId);
router.post("/create", userRoutes.userCreate);
router.put("/delete", userRoutes.userDeleteByUserId);
router.put("/update/id/:user_id", userRoutes.userUpdateByUserId);
module.exports = router;
