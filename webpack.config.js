const path = require('path');

module.exports = {
  devtool: 'source-map',
  mode: 'production',
  entry: './src/js/app.js',
  output: {
    library: 'daki',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, './dist/client/js/'),
    filename: 'app.js',
  },
};
