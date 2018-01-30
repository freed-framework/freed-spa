/**
 * @file webpack.config.dev.js
 * @author denglingbo
 *
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebPlugin = require('html-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');

// 调用 framework
var makeWebpack = require('../make-webpack.config');

var ROOT_PATH = path.resolve(__dirname);
const ENV = process.env.NODE_ENV;
const CONF = process.env.CONF;

var webpackConfig = makeWebpack({
    entry: {
        common: ['moment', 'core-js', 'immutable'],
        index: './src/index',
    },
    output: {
        path: path.resolve(ROOT_PATH, './dist/'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].chunk.js'
    },
    plugins: [
        new HtmlWebPlugin({
            filename: 'index.html',
            template: './src/index.dev.html',
            chunks: ['common', 'vendor', 'index'],
            inject: 'body',
        }),
    ],
    resolve: {
        modules: [
            path.resolve(ROOT_PATH, 'node_modules'),
            path.join(ROOT_PATH, './src'),
        ],
        // 省略后缀
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            'freed-spa': path.resolve(__dirname, '../'),
        }
    },

    module: {
        rules: [
            {
                // 图片加载器
                test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[=a-z0-9]+)?$/,
                loader: 'url-loader?limit=10000&name=images/[hash].[ext]'
            }
        ]
    }
});

module.exports = webpackConfig;
