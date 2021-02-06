const path = require("path");

module.exports = {
  entry: "./src/moglog.js",
  output: {
    filename: "moglog.min.js",
    path: path.resolve(__dirname + "/dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: './.babelrc'
          }
        }
      }
    ]
  },
  mode: "production"
};