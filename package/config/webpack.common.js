const fs = require("fs");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

// We set this in the `build:modules` package.json script
const esmodules = process.env.BABEL_MODULES === "1";

// Get the directory this script was called from
const rootDirectory = fs.realpathSync(process.cwd());

/**
 * Creates a path based on the location the command run from. this is usually this is the base App path.
 * @param {relativePath} relativePath Relative path based on the base app directory
 * @returns {String} A new path resolved with the base app directory
 */
const resolvePathFromRoot = (relativePath) => (
  path.resolve(rootDirectory, relativePath)
);

module.exports = {
  output: {
    path: resolvePathFromRoot("dist"),
    publicPath: "/",
    chunkFilename: "[chunkhash]-[name].bundle.js",
    filename: "[hash]-[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        type: "javascript/auto"
      },
      {
        test: /\.(graphql|gql)$/,
        loader: "graphql-tag/loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  modules: esmodules ? false : "auto",
                  // https://babeljs.io/docs/en/babel-preset-env#targets
                  targets: {
                    node: "8",
                    browsers: [
                      "last 2 versions",
                      "ie 11"
                    ]
                    // Note: If we eventually drop IE11 supports, it should be safe
                    // to go back to passing `esmodules: true` here. But for now,
                    // we want the mjs files to be transformed to be IE11 compatible
                    // EXCEPT for `import`. This allows Webpack 4 to tree shake this
                    // package but yet still remain compatible with IE11 without
                    // further transformation by the app using this package.
                    // esmodules
                  },
                  // https://babeljs.io/docs/en/babel-preset-env#usebuiltins-usage-experimental
                  useBuiltIns: "usage"
                }
              ],
              "@babel/preset-react"
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }],
              "@babel/plugin-syntax-dynamic-import",
              [
                "@babel/plugin-transform-runtime",
                {
                  useESModules: esmodules
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: resolvePathFromRoot(".env"),
      systemvars: true
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: "public" }
    ]),
    new HtmlWebPackPlugin({
      template: "./src/index.html"
    })
  ]
};
