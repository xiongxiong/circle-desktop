const path = require('path')

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
		alias: {
      '~': path.resolve(__dirname, '..', 'src'),
		},
  },
  module: {
    rules: require('./rules.webpack'),
  },
}