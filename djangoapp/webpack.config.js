const path = require("path")
const webpack = require("webpack")
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
  // Where Webpack looks to load your JavaScript
   entry: {
      main: path.resolve(__dirname, "src/index.js"),
   },
   
   output: {
      path: path.resolve(__dirname, "./static/djangoapp/"),
      filename: "[name].js",
   },

   // Add a rule so Webpack reads JS with Babel
   module: { 
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: ["babel-loader", "source-map-loader"],
      },
      {
         test: /\.css$/,
         use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
         test: /\.(jpe?g|png|gif|svg)$/i, 
         loader: "file-loader",
         options: {
            name: "images/[path][name].[ext]",
            limit: 10000,
         },
      },
   ]},

   // Where find modules that can be imported (eg. React) 
   resolve: {
      extensions: ["*", ".js", ".jsx"],
      modules: [
         path.resolve(__dirname, "src"),
         path.resolve(__dirname, "node_modules"),
      ],
   },

   mode: "development",
   
   plugins: [
      // Don't output new files if there is an error
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.ProvidePlugin({
         $: "jquery",
         jQuery: "jquery",
         "window.jQuery": "jquery"
      }),
      new SourceMapDevToolPlugin({
         filename: "[file].map"
      }),
   ],

}