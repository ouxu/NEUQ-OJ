const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //抽取CSS文件插件

module.exports = {
    entry: {
        pages: __dirname +'/app/src/main.js',
        vendors:['react','react-dom','react-router','redux']
        //第三方库和框架
    },
    output: {
        path: __dirname + '/app/dist',
        publicPath:'http://ohtk9ocqw.bkt.clouddn.com/oj/',  //事实上，这个配置直接影响了图片的输出路径
        filename: 'js/bundle.[hash:6].js'
        // 添加 chunkFilename
        // chunkFilename: '[name].[chunkhash:5].chunk.js',

    },
    devtool:false,
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') }, //坑：不能用叹号链接，必须写成这种格式
            { test: /\.less$/, loader: ExtractTextPlugin.extract('css!less') },
            { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.(png|jpg)$/, loader: 'url?limit=8192&name=img/[name].[ext]' },
            { test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'url' },
            { test: /\.json$/, loader: 'json-loader'}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors','js/vendors.[hash:6].js'),
        new ExtractTextPlugin('css/bundle.[contenthash:6].css'),
        // jquery配置
        // new webpack.ProvidePlugin({ $: "jquery" }),
        // 压缩配置
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // 配置环境变量到Production，防止控制台警告
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
};