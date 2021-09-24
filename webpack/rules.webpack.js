module.exports = [
	{
		test: /\.node$/,
		use: 'node-loader'
	},
	{
		test: /\.(m?js|node)$/,
		parser: { amd: false },
		use: {
			loader: '@marshallofsound/webpack-asset-relocator-loader',
			options: {
				outputAssetBase: 'native_modules'
			}
		}
	},
	{
		test: /\.(js|ts|tsx)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader'
		}
	},
	{
		test: /\.css$/,
		use: [ 'style-loader', 'css-loader' ]
	},
	{
		test: /\.(png|jpg|jpeg)$/,
		type: 'asset/resource',
	},
	{
		test: /\.(woff|woff2|eot|ttf|svg)$/,
		type: 'asset/inline',
	},
];
