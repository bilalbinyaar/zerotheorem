const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
// const Dotenv = require("dotenv-webpack");

module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
    publicPath: "/",
  },
  deServer: {
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
    ],
  },
  // resolve: {
  //   fallback: {
  //     fs: false,
  //     path: require.resolve("path-browserify"),
  //     os: require.resolve("os-browserify/browser"),
  //   },
  // },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    // new Dotenv(),
  ],
};
