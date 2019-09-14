// CSS preprocessor

const sass = require("node-sass-middleware");

module.exports = (app, appEnv) => {
  app.use(sass({
    src: appEnv.middlewares.sass.src,
    dest: appEnv.middlewares.sass.dest,
    debug: appEnv.development,
    outputStyle: appEnv.middlewares.sass.outputStyle
  }));
}