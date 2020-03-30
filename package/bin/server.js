#!/usr/bin/env node
/* eslint-disable no-console */

const argv = require("minimist")(process.argv.slice(2));

// node.js server used to serve assets bundled by Webpack
// use `npm start` command to launch the server.
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../config/webpack.dev.js");

const port = argv.port || 8080;

const options = {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  open: true,
  contentBase: "build",
  stats: { colors: true },
  historyApiFallback: true
};

const server = new WebpackDevServer(webpack(config), options);

console.log("Starting the dev web server...");

server.listen(port, "localhost", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("WebpackDevServer listening at localhost:", port);
});
