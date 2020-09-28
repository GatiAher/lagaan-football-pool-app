const express = require("express");

module.exports = function (TABLE) {
  const controller = require("../controllers/ra-controller.js")(TABLE);
  const router = express.Router();

  router.get("/ids", controller.getMany); // works
  router.get("/:id", controller.getOne); // works
  router.get("/", controller.getList); // works, partially
  router.put("/:id", controller.update); // works
  router.put("/", controller.updateMany); // works
  router.delete("/:id", controller.delete); // works
  router.delete("/", controller.deleteMany); // works
  router.post("/", controller.create); // works

  return router;
};
