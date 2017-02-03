/**
 * Created by xiyuyizhi on 16-12-20.
 */

var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var DashboardPlugin = require('webpack-dashboard/plugin')

var config={

    entry:{
        app:__dirname+'/src/index.js'
    },
    output:{
        path:'dist',
        filename:'WW.ajax.min.js'
    },
    resolve: {
        modulesDirectories: ['node_modules','./'],
        alias: {
            'npm': __dirname + '/node_modules'
        },
        extensions: ['', '.js', '.html','.css']
    },
    module:{
        // preLoaders: [
        //     {
        //         test: /\.js$/,
        //         loader: "eslint-loader",
        //         exclude: /node_modules/,
        //     },
        // ],
        loaders:[
            {
                test:/\.js/,
                loaders:['babel'],
                exclude:/node_modules/
            },{
                test:/\.less/,
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
    },
    eslint: {
        configFile: '.eslintrc',
        fix:true
    },
    devtool: 'eval-source-map',
    plugins:[
        //new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new DashboardPlugin(),
        new webpack.BannerPlugin("author：xiyuyizhi \nCopyright xiyuyizhi."),
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            template:'src/index.html',
            inject: 'body'
        })
    ],
    devServer: {
        host:'0.0.0.0',
        port: 3001,
        proxy: {
            '/api/*': {
                target: 'http://localhost:3005/',
                changeOrigin: true,
                secure: false
            },
            '/rest/*':{
                target: 'http://localhost:9000/',
                changeOrigin: true,
                secure: false
            }
        }
    }

}

module.exports=config