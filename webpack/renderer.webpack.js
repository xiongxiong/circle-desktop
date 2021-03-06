const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	output: {
		publicPath: process.env.ASSET_PATH
	},
	resolve: {
		extensions: [ '.ts', '.tsx', '.js' ],
		alias: {
			'@': path.resolve(__dirname, '..', 'electron'),
			'~': path.resolve(__dirname, '..', 'src')
		}
	},
	module: {
		rules: require('./rules.webpack')
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, '../assets'),
					to: path.resolve(__dirname, '../.webpack/renderer/main_window/assets')
				}
			]
		}),
	]
};
