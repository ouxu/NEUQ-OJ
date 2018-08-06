const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')
const dflPort = 8081  // 配置端口
const getThemeConfig = require('./theme.config')
const theme = getThemeConfig()

module.exports = {
  // 配置服务器
  devServer: {
    port: dflPort,
    contentBase: path.join(__dirname, './app'),
    historyApiFallback: true,
    inline: true,
    noInfo: false,
    open: true,
    stats: {colors: true},
    overlay: {
      warnings: true,
      errors: true
    },
    // proxy: {
    //   '/apply/*': {
    //     target: 'http://123.206.55.207:7001',
    //     changeOrigin: true,
    //     secure: false
    //   }
    // },
    host: '0.0.0.0'
  },
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'webpack-dev-server/client?http://127.0.0.1:' + dflPort,
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/app/src/main.js')
  ],
  output: {
    path: '/dist/assets',
    publicPath: '/assets',
    filename: 'bundle.js'
  },
  cache: true,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: 'react-hot-loader!babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'postcss-loader', `less-loader?{"modifyVars":${JSON.stringify(theme)}}`]
      },
      { test: /\.woff$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot$/, loader: 'file-loader' },
      { test: /\.svg$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      {
        test: /\.(png|jpg|gif|woff|woff2|svg)$/,
        loaders: [
          'url-loader?limit=10000&name=[hash:8].[name].[ext]'
        ]
      }
    ]
  },
  resolve: {
    extensions: [' ', '.js', '.jsx'],
    alias: {
      'actions': path.join(__dirname, '/app/src/actions'),
      'api': path.join(__dirname, '/app/src/api'),
      'components': path.join(__dirname, '/app/src/components'),
      'containers': path.join(__dirname, '/app/src/containers'),
      'images': path.join(__dirname, '/app/src/images'),
      'reducers': path.join(__dirname, '/app/src/reducers'),
      'utils': path.join(__dirname, '/app/src/utils')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function () {
          return [autoprefixer]
        }
      }
    }),
    new webpack.DefinePlugin({
      __DEVCLIENT__: false,
      __DEVSERVER__: true,
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
}
