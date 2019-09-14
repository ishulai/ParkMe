// Utility modules that can be called from anywhere

module.exports = (app, appEnv) => {
  require("./database")(app, appEnv);
  require("./s3")(app, appEnv);
}