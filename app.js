const express = require("express");
const app = express();

// Config file path
const config = require("./config/config.json");

// Static resource path
app.use(express.static(__dirname + '/public'));

// Helper modules
require("./middlewares/_index")(app, config);
require("./routes/_index")(app, config);
require("./util/_index")(app, config);

if(config.development) {
  // Starts web server locally (development)
  app.listen(config.hosts.web.port, () => {
    console.log("Web server listening on port " + config.hosts.web.port);
  });
} else {
  // Packages web server as module (AWS Lambda)
  module.exports = app;
}