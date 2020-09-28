const express = require("express");

module.exports = function (TABLE) {
  const controller = require("../controllers/generic-controller.js")(TABLE);
  const resetController = require("../controllers/reset-controller")(TABLE);
  const router = express.Router();

  router.get("/ids", controller.getMany); // works
  router.delete("/clear", controller.clearTable); // works
  router.delete("/reset", resetController.resetTable); // works

  router.get("/:id", controller.getOne); // works
  router.get("/", controller.getList); // works, partially
  router.put("/:id", controller.update); // works
  router.put("/", controller.updateMany); // works
  router.delete("/:id", controller.delete); // works
  router.delete("/", controller.deleteMany); // works
  router.post("/", controller.create); // works

  return router;
};
