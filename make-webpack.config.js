/**
 * @file make-webpack.config.js
 * @author denglingbo
 *
 */
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const process = require('process');
const webpack = require('webpack');
const HtmlWebPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ObjectAssign = require('object-assign');

const ROOT_PATH = path.resolve(__dirname);
const ENV = process.env.NODE_ENV;
const CONF = process.env.CONF;
const __PRO__ = ENV === 'production';
const configFiles = glob.sync(process.cwd() + '/config/*.js');

const isWebFeSelf = __dirname === process.cwd();

/**
 * By Rongyao ^.^
 * @return {Array}
 */
function getBabelLoaderInclude() {
    var babelLoaderInclude = [];
    fs.readdirSync(__dirname).forEach(function (file) {
        if (['dist', 'tools', 'node_modules', 'gulpfile.js'].indexOf(file) <= 0
            && file.indexOf('.') !== 0
            && file.indexOf('.config') <= 0) {
            babelLoaderInclude.push(path.join(__dirname, file));
        }
    });

    if (!isWebFeSelf) {
        fs.readdirSync(process.cwd()).forEach(function (file) {
            if (['dist', 'tools', 'mock', 'node_modules', 'gulpfile.js'].indexOf(file) <= 0
                && file.indexOf('.') !== 0
                && file.indexOf('.config') <= 0) {
                babelLoaderInclude.push(path.join(process.cwd(), file));
            }
        });
    }

    return babelLoaderInclude;
}

/**
 * 获取公有配置
 * @returns {*}
 */
function getPublicConfig() {
    let f = null;
    let type = !CONF ? '' : '.' + CONF;
    let fileName = 'config' + type + '.js';

    configFiles.forEach(function (item) {
        const expr = new RegExp(fileName + '$');
        if (expr.test(item)) {
            f = item;
        }
    });

    if (f === null) {
        throw new Error('Required {PRODUCT CONFIG PATH}: ' + file);
    }

    return f;
}

const vendor = [
    'react-redux', 'redux-thunk', 'react-router', 'react-router-dom'
];

/**
 * 构建入口
 * @param options
 */
const maker = function (options) {
    // 默认配置
    let entry = {
        common: [],
        vendor: __PRO__ ? vendor : ['react', 'react-dom'].concat(vendor),
    };

    ObjectAssign(entry, options.entry);

    const publicConfig = getPublicConfig();
    if (publicConfig !== null) {
        entry.vendor = entry.vendor.concat([publicConfig]);
    }

    let hotServer = 'http://0.0.0.0:8899' || options.hotServer;
    let plugins = [];

    const output = {};

    let devtool = false;

    if (__PRO__) {
        plugins = plugins.concat(new webpack.optimize.UglifyJsPlugin({
            // 是否最紧凑的输出
            beautify: false,
            // 是否需要注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                // drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        }));
    } else {
        entry.vendor = entry.vendor.concat([
            'react-hot-loader/patch',
            `webpack-dev-server/client?${hotServer}`,
            'webpack/hot/only-dev-server',
        ]);

        plugins = plugins.concat([
            // 开启全局的模块热替换（HMR）
            new webpack.HotModuleReplacementPlugin(),

            // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
            new webpack.NamedModulesPlugin(),
        ]);

        devtool = 'source-map';

        // 对于热替换（HMR）是必须的，让webpack知道在哪里载入热更新的模块（chunk）
        output.publicPath = '/';
    }

    plugins = plugins.concat([
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2,
            chunks: Object.keys(entry).filter(key => key !== 'vendor')
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),

        new ExtractTextPlugin({
            filename: '[name].[chunkhash:8].css',
            // filename: (getPath) => getPath('[name].css').replace(/\//g, '-'),
            allChunks: true,
        }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(ENV),
            }
        }),

        new webpack.NoEmitOnErrorsPlugin(),
    ]);

    return {
        devtool: devtool,

        // 入口配制
        entry: entry,
        // 输出配制
        output: Object.assign(output, options.output),

        // 插件配制
        plugins: plugins.concat(options.plugins),

        externals: Object.assign(__PRO__ ? {
            'react': 'React',
            'react-dom': 'ReactDOM',
        } : {}, options.externals || {}),

        // loaders 配制
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: ['babel-loader'],
                    include: getBabelLoaderInclude(),
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            'autoprefixer-loader',
                            'sass-loader',
                        ],
                    })
                },
                // less 加载器
                {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            'autoprefixer-loader',
                            'less-loader',
                        ]
                    })
                },
                // css 加载器
                // Reference: https://github.com/webpack/style-loader
                // Reference: https://github.com/webpack/css-loader
                // Reference: https://github.com/webpack/autoprefixer-loader
                // Reference: https://github.com/webpack/extract-text-webpack-plugin
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            'autoprefixer-loader'
                        ]
                    })
                },
                {
                    // JSON资源文件加载器
                    // Reference: https://github.com/webpack/json-loader
                    test: /\.json$/,
                    loader: 'json-loader'
                }
            ].concat(options.module.rules)
        },

        resolve: {
            // alias 是配置全局的路径入口名称，只要涉及到下面配置的文件路径，可以直接用定义的单个字母表示整个路径
            alias: Object.assign({
                // 此处的 lib 只是位置开发阶段调试方便
                // 'framework/lib': path.resolve(ROOT_PATH, './src'),
                // 'framework': path.resolve(ROOT_PATH, './'),
            }, options.resolve.alias || {}),

            // 省略后缀
            extensions: ['.js', '.jsx'],

            // 配置模块库所在的位置
            modules: [
                path.resolve(ROOT_PATH, 'node_modules'),
                path.join(ROOT_PATH, './src')
            ].concat(options.resolve.modules)
        },
    };
};

module.exports = maker;
