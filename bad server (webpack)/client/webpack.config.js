const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ENV = process.env.NODE_ENV || 'development';

module.exports = {
	entry: resolve(__dirname, 'src', 'index.js'),
	output: {
		path: resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.css$/i,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader']
			},

		],
	},

	resolve: {
		extensions: ['.js', '.jsx'],
	},

	plugins: [
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
		new HtmlWebpackPlugin({
			template: "src/index.html"
		}),
	],

	devtool: "source-map",

	mode: ENV,

	optimization: {
		minimize: ENV === 'production',
	},

	devServer: {
		historyApiFallback: true,
		contentBase: resolve(__dirname, 'dist'),
		compress: false,
		port: 9000
	},
};