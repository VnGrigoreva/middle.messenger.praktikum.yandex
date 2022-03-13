const webpack = require("webpack");
const path = require("path");
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const HTMLWebpackPlugins = require("html-webpack-plugin");

module.exports = {
  resolve: {
    extensions: [".js", ".ts"],
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      os: false,
    },
  },
  mode: NODE_ENV ? NODE_ENV : "development",
  entry: path.resolve(__dirname, "src/index.ts"),
  output: {
    path: path.resolve(__dirname, "dist_w"),
    filename: "index.js",
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000,
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        include: path.join(__dirname, "src"),
        loader: "pug-loader",
      },
      {
        test: /\.(ts|js)$/,
        exclude: /(node_modules|__tests__)/,
        use: ["ts-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]",
        },
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugins({
      template: path.resolve(__dirname, "src/index.pug"),
      inject: true,
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
  devServer: {
    compress: true,
    port: PORT,
    open: true,
    hot: true,
  },
  devtool: "source-map",
};
