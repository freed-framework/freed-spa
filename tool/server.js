/**
 * @file dev.server.js
 * @author deo
 *
 * 本地服务
 */
var path = require('path');
var process = require('process');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

/**
 * 引入构建配置
 */
var webpackConfig = require(
    path.join(process.cwd(), './webpack.config')
);

/**
 * 引入代理
 * @type {nproxy}
 */
var nporxy = require('./proxy/nproxy');

function startProxy(proxyConfig) {
    // 启动 代理服务
    nporxy({
        host: proxyConfig.host,
        port: proxyConfig.port,
    }, {
        rules: proxyConfig.rules
    });
}

module.exports = function (options) {
    var devConfig = {
        publicPath: '/',
        host: '0.0.0.0',
        port: 8899,
        // 开启服务器的模块热替换（HMR）
        hot: true,
        inline: true,
        historyApiFallback: {
            index: '/'
        },
        stats: {
            colors: true
        },
        proxy: {}
    };

    Object.assign(devConfig, options.devConfig);

    // 启动代理服务
    if (options.proxyConfig !== false) {
        var proxyConfig = {
            host: devConfig.host,
            port: '9999',
            rules: [],
        };

        Object.assign(proxyConfig, options.proxyConfig);

        startProxy(options.proxyConfig);
    }

    /**
     * 准备启动本地服务
     */
    var compiler = webpack(webpackConfig);

    /**
     * webpack dev server 配置
     */
    var server = new WebpackDevServer(compiler, devConfig);

    /**
     * 启动本地服务环境
     */
    server.listen(devConfig.port, devConfig.host, function (error) {
        if (error) {
            console.error(error);
        } else {
            console.info('Listening on port %s. ' +
                'Open up http://' + devConfig.host + ':%s/ in your browser.',
                devConfig.port, devConfig.port);
        }
    });
}
