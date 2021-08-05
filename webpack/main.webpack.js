const path = require('path');

module.exports = {
	resolve: {
		extensions: [ '.ts', '.js' ],
		modules: ['node_modules'],
		alias: {
			'~': 'src'
		},
	},
	entry: './electron/main.ts',
	module: {
		rules: require('./rules.webpack')
	}
};
