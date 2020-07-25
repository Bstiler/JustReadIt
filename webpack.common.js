const path = require('path');

module.exports = {
  entry: './src/handler.ts',
  output: {
    filename: 'handler.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'handler',
    libraryTarget: 'umd',
    libraryExport: '',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {test: /\.ts$/, use: ['ts-loader']},
      // {test: /\.node$/, use: ['node-loader']},
    ],
  },
  target: 'node',
  externals: [
    function(context, request, callback) {
      if (request === 'canvas') {
        return callback(null, 'commonjs ./canvas');
      } else {
        return callback();
      }
    },
  ],
};
