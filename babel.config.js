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
		"babel-plugin-transform-typescript-metadata",
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
		]
	]
};
