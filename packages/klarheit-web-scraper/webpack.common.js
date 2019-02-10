const path = require('path');

module.exports = {
  entry: {
    mole: './src/index.ts'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts' ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'Mole',
    libraryTarget: 'var',
    libraryExport: 'default'
  }
};
