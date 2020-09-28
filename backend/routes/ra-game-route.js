const express = require("express");
const controller = require("../controllers/ra-game-controller.js");

const router = express.Router();
router.get("/ids", controller.getMany); // works
router.get("/:id", controller.getOne); // works
router.get("/", controller.getList); // works, partially
router.put("/:id", controller.update); // works
router.put("/", controller.updateMany); // works
router.delete("/:id", controller.delete); // works
router.delete("/", controller.deleteMany); // works
router.post("/", controller.create); // works

module.exports = router;
