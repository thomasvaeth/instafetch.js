module.exports = {
  entry: [
    './src/instafetch.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'instafetch.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  }
}
