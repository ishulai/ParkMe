// Express "modules" - runs during Express requests

module.exports = (app, appEnv) => {
  require("./webpack")(app, appEnv);
}