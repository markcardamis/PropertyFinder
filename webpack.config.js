const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
<<<<<<< .merge_file_3arjlz
const CompressionPlugin = require('compression-webpack-plugin');
=======
>>>>>>> .merge_file_njwjNz

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
    extensions: ['.mjs', '.js', '.jsx']
  },

  plugins: [
    new Dotenv({
      systemvars: true
    }),
    new HtmlWebpackPlugin({
      template: "./src/main/resources/static/index.html"
<<<<<<< .merge_file_3arjlz
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    })
  ]
=======
    })
  ],

>>>>>>> .merge_file_njwjNz
};