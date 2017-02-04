/**
 * Created by xiyuyizhi on 17-2-4.
 */
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var DashboardPlugin = require('webpack-dashboard/plugin')

module.exports={
	entry: {
		app:'./src/index.js',
	},
	output: {
		path: 'dist',
		filename: 'app.min.js'
	},
	eslint: {
		configFile: '.eslintrc',
		fix: true
	},
	devtool: '#eval-source-map',
	devServer: {
		host: '0.0.0.0',
		port: 3001,
		proxy: {
			'/api/*': {
				target: 'http://localhost:3005/',
				changeOrigin: true,
				secure: false
			},
			'/rest/*': {
				target: 'http://localhost:9000/',
				changeOrigin: true,
				secure: false
			}
		}
	},
	plugins: [
		new DashboardPlugin(),
		new webpack.BannerPlugin("author：xiyuyizhi \nCopyright xiyuyizhi."),
		new ExtractTextPlugin("styles.css"),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: 'body'
		})
	]
}