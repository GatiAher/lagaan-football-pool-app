// Import express
const express = require("express");
// Import books-controller
const userRoutes = require("../controllers/user-controller.js");

const router = express.Router();
router.get("/", userRoutes.userAll);
router.get("/ranked", userRoutes.userAllOrderOfScore);
router.get("/id/:id", userRoutes.userById);
router.post("/create", userRoutes.userCreate);
router.put("/delete", userRoutes.userDeleteById);
router.put("/update/id/:id", userRoutes.userUpdateById);
module.exports = router;
