module.exports = {
	presets: [
		'@babel/preset-env',
		'@babel/preset-typescript',
		[
			'@babel/preset-react',
			{
				runtime: 'automatic'
			}
		]
	],
	plugins: [
		'babel-plugin-transform-typescript-metadata',
		'babel-plugin-styled-components',
		[
			'@babel/plugin-transform-runtime',
			{
				regenerator: true
			}
		],
		[
			'@babel/plugin-proposal-decorators',
			{
				legacy: true
			}
		],
		[
			'@babel/plugin-proposal-class-properties',
			{
				loose: false
			}
		]
	],
	// Babel >= 7.13.0 (https://babeljs.io/docs/en/assumptions)
	assumptions: {
		setPublicClassFields: false
	}
};
