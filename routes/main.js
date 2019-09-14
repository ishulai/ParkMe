// Serves "pages"

const express = require("express");

module.exports = (app, appEnv) => {
  var router = express.Router();
  const controller = require("./controllers/main")(appEnv);

  router.get("/", controller.default);

  return router;
}