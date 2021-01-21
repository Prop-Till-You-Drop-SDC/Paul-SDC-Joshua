var path = require('path');
var SRC_DIR = path.join(__dirname);
var DIST_DIR = path.join(__dirname, '/public');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: 'file-loader',
      }
    ]
  },
   output: {
    filename: 'bundle.js',
    path: DIST_DIR
  }
};