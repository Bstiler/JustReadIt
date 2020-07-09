const path = require('path')

module.exports = {
  entry: './src/handler.ts',
  output: {
    filename: 'handler.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'handler',
    libraryTarget: 'umd',
    libraryExport: 'export',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{test: /\.ts$/, use: ['ts-loader']}],
  },
  target: 'node',
  externals: {
    canvas: 'commonjs canvas',
  },
};
