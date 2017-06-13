// webpack.base.conf.js主要是构建的全局设置，主要是增加了以下代码，已经增加在JS文件里，这里只是做一个补充说明，
// 具体请看`build/webpack.base.conf.js`。
var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')

var glob = require('glob'); // node的glob模块 允许使用 * 等符号，来写一个glob规则
// 此处的moduleName即 config/index.js中模块定义的moduleName
var entries =  utils.getMultiEntry('./src/'+config.moduleName+'/**/**/*.js'); // 获得入口js文件
var chunks = Object.keys(entries);

console.log(chunks)

var projectRoot = path.resolve(__dirname, '../')
const vuxLoader = require('vux-loader')

var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir) //path.join将路径合拼
}

var webpackConfig = {

  entry:entries,
  output: { // 打包之后生成的文件会放到output属性所指定的文件目录下
    path: config.build.assetsRoot, // 打包输出的路径
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'  // process.env.NODE_ENV系统环境变量
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    // webpack在构建包的时候会按目录的进行文件的查找，
    // resolve属性中的extensions数组中用于配置程序可以自行补全哪些文件后缀
    extensions: ['.js', '.vue', '.json'], // //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  module: { // 定义了对模块的处理逻辑
    rules: [
      {
        test: /\.vue$/, // 当需要加载的文件匹配test的正则时，就会调用后面的loader对文件进行处理
        loader: 'vue-loader', // loaders定义了一系列的加载器
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader', 
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      },
      
    ]
  },
  // 插件（Plugins）是用来拓展webpack功能的，它们会在整个构建过程中生效，执行相关的任务。
  plugins: [
	/*
    // 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 公共模块的名称
      chunks: chunks,  // chunks是需要提取的模块
      minChunks: 4 || chunks.length //公共模块被使用的最小次数。比如配置为3，也就是同一个模块只有被3个以外的页面同时引用时才会被提取出来作为common chunks。

    }),*/
   
  ]
}



module.exports = vuxLoader.merge(webpackConfig, {
    options: {
    
  },	
  plugins: ['vux-ui', 'progress-bar', 'duplicate-style']
})
