#!/usr/bin/env node
/* eslint-disable node/shebang */
/* eslint-disable no-console */
// eslint-disable-next-line node/no-extraneous-require
require("dotenv").config();

// node.js server used to serve assets bundled by Webpack
// use `npm start` command to launch the server.
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const envalid = require("envalid");
const config = require("../config/webpack.dev.js");
const createHydraClient = require("./createHydraClient");

const {
  DEV_SERVER_PORT
} = envalid.cleanEnv(process.env, {
  DEV_SERVER_PORT: envalid.num({
    desc: "Dev server port",
    example: "8080",
    default: 8080
  })
});

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

/**
 * Start the devserver
 * @returns {Promise} An implicit promise
 */
module.exports = async function start() {
  console.log("Creating hydra client...");
  await createHydraClient();

  console.log("Starting the dev web server...");

  server.listen(DEV_SERVER_PORT, "0.0.0.0", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("WebpackDevServer listening at localhost:", DEV_SERVER_PORT);
  });
};
