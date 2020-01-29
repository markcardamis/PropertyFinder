const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/main/webapp/javascript/index.js',
  output: {
    path: path.join(__dirname, "/src/main/resources/static/dist"),
    filename: 'index-bundle.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    port: 5000,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
         'MAPBOX_API': JSON.stringify(process.env.MAPBOX_API),
         'MAPBOX_STYLE': JSON.stringify(process.env.MAPBOX_STYLE),
      }
    }),
    new HtmlWebpackPlugin({
      template: "./src/main/resources/static/index.html"
    })
  ]
};