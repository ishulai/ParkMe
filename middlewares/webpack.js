const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const path = require("path");

module.exports = (app, appEnv) => {
  const mode = appEnv.development ? "development" : "production";
  console.log(path.join(__dirname, "../", "public"));
  const config = {
    entry: "./src/react/index.jsx",
    mode: mode,
    output: {
      path: path.join(__dirname, "../", "public"),
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          use: "babel-loader",
          test: /\.jsx$/,
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "public/index.html"
      }),
      new LiveReloadPlugin()
    ]
  };
  
  app.use(webpackMiddleware(webpack(config)));
}