const express = require("express");
const controller = require("../controllers/ra-game-controller.js");

const router = express.Router();
router.get("/ids", controller.getMany); // works
router.post("/", controller.create);
router.get("/", controller.getList); // works
router.get("/:id", controller.getOne); // works
router.put("/:id", controller.update);
router.put("/", controller.updateMany);
router.delete("/:id", controller.delete);
router.delete("/", controller.deleteMany);

module.exports = router;
