let webpack = require("webpack")
let path = require("path")
let HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require("vue-loader")

module.exports = {
  mode: "development",
  entry: "./src/js/main.js",
  output: {
    path: __dirname + "/public/js",
    publicPath: "/js/",
    filename: "bundle.js"
  },
  node: {
    fs: "empty"
  },
  devtool: 'inline-source-map',
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
        test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.js"
    },
    extensions: [".js", ".vue"],
    modules: [ "node_modules", path.resolve(__dirname, "src/js") , path.resolve(__dirname, "src") ],
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
