const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //打包 css
const autoprefixer = require('autoprefixer');               //自动处理浏览器前缀
const HtmlWebpackPlugin = require('html-webpack-plugin');    //生成 html
const CleanWebpackPlugin = require('clean-webpack-plugin');  //用于清除上次打包文件

module.exports = {
    entry: {
        bundle: __dirname + '/app/src/main.js',
        vendor1: ['react', 'react-dom'],  //第三方库和框架另外打包
        vendor2:['react-router','redux','react-redux']

    },
    output: {
        path: './dist/build/',
        publicPath:'http://ohtk9ocqw.bkt.clouddn.com/oj/',  //表示 index.html 中引入资源的前缀path
        filename: 'js/bundle.[chunkhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
    },
    cache: true,
    devtool: false,
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loaders: 'react-hot-loader!babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?minimize', 'postcss-loader']
                })
            },
            {
                test: /\.less/,
                loaders: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?minimize', 'postcss-loader', 'less-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|svg)$/,
                loaders: [
                    'url-loader?limit=10000&name=img/[hash:8].[name].[ext]'
                ]
            }
        ]
    },
    resolve: {
        extensions: [' ', '.js', '.jsx']
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [autoprefixer];
                }
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:['vendor1','vendor2'],
            filename:'js/[name].[chunkhash:8].js'
        }),
        new ExtractTextPlugin({
            filename: 'css/style.[contenthash:8].css',
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false  // remove all comments
            },
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        }),

        new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
        new webpack.optimize.MinChunkSizePlugin({minChunkSize: 1000}),
        new HtmlWebpackPlugin({
            template: './dist/template.ejs',
            title: 'NEUQ OJ',
            favicon: './app/favicon.ico',
            chunks: ['vendor1','vendor2','bundle']
        }),
        new CleanWebpackPlugin(['dist/build'], {
            verbose: true,
            dry: false
        })
    ]
};
