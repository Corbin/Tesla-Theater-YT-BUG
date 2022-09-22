const path = require('path');

const importDir = path.join(__dirname, 'client');
const exportDir = path.join(__dirname, 'dist');
console.log(exportDir)

module.exports = {
  entry: path.join(importDir, 'index.jsx'),
  output: {
    path: exportDir,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test:/\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
