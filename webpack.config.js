const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    // host: '192.168.0.103',
    // disableHostCheck: true
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        // test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        // options: {
        //     presets: ['@babel/preset-env', '@babel/preset-react']
        // }
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
  new HtmlWebpackPlugin({
      template: "./src/main/resources/static/index.html"
    })
  ]
};