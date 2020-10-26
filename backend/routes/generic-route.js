const express = require("express");

module.exports = function (TABLE) {
  const controller = require("../controllers/generic-controller.js")(TABLE);
  const resetController = require("../controllers/reset-controller")(TABLE);
  const router = express.Router();

  router.delete("/clear", controller.clearTable); // works
  router.delete("/reset", resetController.resetTable); // works

  router.get("/:id", controller.getOne); // works
  router.get("/", controller.getList); // works
  router.put("/:id", controller.update); // works
  router.delete("/:id", controller.delete); // works
  router.post("/", controller.create); // works

  return router;
};
