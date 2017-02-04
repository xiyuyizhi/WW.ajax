/**
 * Created by xiyuyizhi on 16-12-20.
 */

var ExtractTextPlugin = require('extract-text-webpack-plugin')

var merge = require('webpack-merge')
var process=require('process')
var develop =require('./config/development')
var product =require('./config/production')
var base = {
	resolve: {
		modulesDirectories: ['node_modules', './'],
		alias: {
			'npm': __dirname + '/node_modules'
		},
		extensions: ['', '.js', '.html', '.css']
	},
	module: {
		// preLoaders: [
		//     {
		//         test: /\.js$/,
		//         loader: "eslint-loader",
		//         exclude: /node_modules/,
		//     },
		// ],
		loaders: [
			{
				test: /\.js/,
				loaders: ['babel'],
				exclude: /node_modules/
			}, {
				test: /\.less/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader!less'
				)
			},
			{
				test: /\.(png|jpg|jpeg)$/,
				loader: 'url?limit=1024'
			}
		]
	}
}

if(process.env.NODE_ENV=='production'){
	base=merge(base,product)
}else{
	base=merge(base,develop)
}
module.exports = base
