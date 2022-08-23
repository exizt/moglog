const path = require("path");

module.exports = {
  target: ['web', 'es2020'],
  entry: {
    'moglog': path.resolve(__dirname, 'src/index.ts')
  },
  output: {
    filename: '[name].mix.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'module'
    },
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  optimization: {
    minimizer: [
      (compiler) => {
        const TerserPlugin = require('terser-webpack-plugin');
        new TerserPlugin({
          terserOptions: {
            keep_classnames: true,
          },
        }).apply(compiler);
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, "src")], // 모듈 위치
    extensions: [".ts", ".js"]
  }
};