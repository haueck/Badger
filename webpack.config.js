let webpack = require("webpack")
let path = require("path")
let HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require("vue-loader")

module.exports = {
  mode: "none",
  entry: "./src/js/main.js",
  output: {
    path: __dirname + "/public/js",
    publicPath: "/js/",
    filename: "bundle.[contenthash].js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?sourceMap"
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      }
    ]
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.js"
    },
    extensions: [".js", ".vue"],
    modules: [ "node_modules", path.resolve(__dirname, "src/components"), path.resolve(__dirname, "src/js") , path.resolve(__dirname, "src") ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Popper: ["popper.js", "default"]
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Caching'
    })
  ]
}
