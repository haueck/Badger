let webpack = require("webpack")
let path = require("path")
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader")


module.exports = {
  mode: "development",
  entry: {
    app: "./js/app.js",
    welcome: "./js/welcome.js"
  },
  output: {
    path: __dirname + "/dist/js",
    publicPath: "/js/",
    filename: "[name].js"
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
        test: /\.(txt|xsl|xml)$/,
        use: 'raw-loader'
      }
    ]
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.js"
    },
    extensions: [".js", ".vue"],
    modules: [ "node_modules", path.resolve(__dirname, "js"), path.resolve(__dirname) ],
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
    }),
    new CopyPlugin([
      { from: path.resolve(__dirname, "css"), to: "../css" },
      { from: path.resolve(__dirname, "html"), to: "../html" },
      { from: path.resolve(__dirname, "images"), to: "../images" },
      { from: path.resolve(__dirname, "images/favicons/favicon.ico"), to: ".." },
      { from: path.resolve(__dirname, "node_modules/tinymce/skins"), to: "../css/tinymce" }
    ])
  ]
}
