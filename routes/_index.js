// Handles all web requests (POST, GET, etc.)

module.exports = (app, appEnv) => {
  app.use("/", require("./main")(app, appEnv));
}