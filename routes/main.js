// Serves "pages"

const express = require("express");

module.exports = (app, appEnv) => {
  var router = express.Router();
  const controller = require("./controllers/ping")(appEnv);

  router.get("/", controller.default);
  router.post("/post", controller.postapi);

  return router;
}