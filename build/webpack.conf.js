const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'template.main.js',
    libraryTarget: 'umd', // 采用通用模块定义
    library: 'template', // 库名称
    libraryExport: 'default', // 兼容 ES6(ES2015) 的模块系统、CommonJS 和 AMD 模块规范
    umdNamedDefine: true,
    globalObject: 'this' // 兼容node和浏览器运行，避免window is not undefined情况
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['*', '.js', '.vue']
  },
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]-[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              modules: true,
              localIdentName: '[name]-[local]--[hash:base64:5]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 15000
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // new ExtractTextPlugin('fastui.css'),
    new UglifyJSPlugin({
      parallel: true,
      uglifyOptions: {
        compress: {
          warnings: false
        },
        mangle: true
      },
      sourceMap: true
    })
  ]
}
