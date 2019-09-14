// Serves "pages"

const express = require("express");

module.exports = (app, appEnv) => {
  var router = express.Router();
  const controller = require("./controllers/ping")(appEnv);

  router.get("/", controller.default);
  router.post("/ping", controller.pingApi);

  return router;
}