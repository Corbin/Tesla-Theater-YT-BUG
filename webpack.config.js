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
    fallback: {
      "querystring": require.resolve("querystring-es3"),
      "https": require.resolve("https-browserify"),
      "url": require.resolve("url/"),
      "http": require.resolve("stream-http"),
      "buffer": require.resolve("buffer/")
    },
    extensions: ['.js', '.jsx'],

  }
};
