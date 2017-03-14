const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //抽取CSS文件插件
const OpenBrowserPlugin = require('open-browser-webpack-plugin'); //自动打开浏览器插件


module.exports = {
    // 配置服务器
    devServer: {
        historyApiFallback: true,
        hot: true,
        contentBase: './app',
        port: 8080
    },

    // 配置入口
    entry: {
        pages: __dirname +'/app/src/main.js',
        vendors:['react','react-dom','react-router','redux']  //第三方库和框架
    },
    output: {
        path: 'dist',  //不写居然也没事，由于有服务器，生成不了静态文件，这也是一个坑
        publicPath: 'dist/',
        filename: 'js/bundle.js'
    },
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
        new webpack.optimize.CommonsChunkPlugin('vendors','js/vendors.js'),
        new ExtractTextPlugin('css/bundle.css'),
        // 如需jquery请解锁
        // new webpack.ProvidePlugin({ $: "jquery" }),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
        // new DashboardPlugin(dashboard.setData),
    ]
};
