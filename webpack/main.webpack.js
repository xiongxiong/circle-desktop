const path = require('path');

module.exports = {
	resolve: {
		extensions: [ '.ts', '.js' ],
		modules: [ 'node_modules' ],
		alias: {
			'@': path.resolve(__dirname, '..', 'electron'),
			'~': path.resolve(__dirname, '..', 'src')
		}
	},
	entry: './electron/main.ts',
	module: {
		rules: require('./rules.webpack')
	}
};
