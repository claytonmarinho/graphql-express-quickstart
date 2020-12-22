require("dotenv").config();
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");

const { DEBUG_PORT = 9222 } = process.env;

module.exports = (options) => {
  return {
    entry: path.resolve(process.cwd(), "src/index.js"),
    target: "node",
    devtool: options.env === "dev" ? "inline-source-map" : undefined,
    mode: options.env === "dev" ? "development" : "production",
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    regenerator: true,
                  },
                ],
              ],
            },
          },
        },
      ],
    },
    resolve: {
      extensions: [".js"],
      modules: [
        "node_modules",
        path.resolve(process.cwd(), "src"),
        path.resolve(process.cwd(), "node_modules"),
      ],
    },
    output: {
      path: path.resolve(process.cwd(), "build"),
      filename: "index.js",
    },
    plugins: [
      new NodemonPlugin({
        nodeArgs: [`--inspect=${DEBUG_PORT}`],
        verbose: true,
      }),
    ],
  };
};
