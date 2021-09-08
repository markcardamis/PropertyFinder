const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
  entry: './src/main/webapp/javascript/index.js',
  mode: 'production',
  output: {
    path: path.join(__dirname, "/src/main/resources/static/dist"),
    filename: 'src/main/webapp/javascript/[name].js',
    // filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    port: 5000,
  },

  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        }
      },
      { test: /\.js$/, loader: "babel-loader" },
      {
        test: /\.(css|s[ac]ss)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx']
  },

  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
         'MAPBOX_API': JSON.stringify(process.env.MAPBOX_API),
         'MAPBOX_STYLE': JSON.stringify(process.env.MAPBOX_STYLE),
         'LOGGING': JSON.stringify(process.env.LOGGING)
      }
    }),
    new HtmlWebpackPlugin({
      template: "./src/main/resources/static/index.html"
    }),
  ]
};