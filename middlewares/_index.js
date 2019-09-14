// Express "modules" - runs during Express requests

module.exports = (app, appEnv) => {
  require("./sass")(app, appEnv);
  require("./webpack")(app, appEnv);
}