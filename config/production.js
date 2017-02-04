/**
 * Created by xiyuyizhi on 17-2-4.
 */
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var DashboardPlugin = require('webpack-dashboard/plugin')

module.exports={
	entry: {
		code:'./src/code.js',
		all:'./src/all.js'
	},
	output: {
		path: 'dist',
		filename: 'evanayf.[name].min.js'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_debugger: true,
				drop_console: true
			}
		}),
		new DashboardPlugin(),
		new webpack.BannerPlugin("author：xiyuyizhi \nCopyright xiyuyizhi."),
		new ExtractTextPlugin("styles.css")
	]
}