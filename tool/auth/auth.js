/**
 * @file auth.js
 * @author lee
 * @description 用于用户认证登录
 */

var http = require('http');
var https = require('https');
var crypto = require('crypto');
var url = require('url');

module.exports = {

    login: function(params, callback) {
        //密码加密
        // var pw = this.cryptoPw(params.pw);

        //拿到登录地址，根据协议类型，设置不同的option
        var address = url.parse(params.url);
        params.host = address.hostname;
        params.port = address.port;
        params.path = address.path;

        var req = {};
        Object.keys(params.req).forEach(k => {
            req[k] = params.req[k];
        });

        delete params.req;

        var requester = address.protocol === 'https:' ? https : http;

        var post_req = requester.request(params, function(response) {
            var responseText = [];
            var size = 0;

            response.setEncoding('utf8');

            // 接收数据
            response.on('data', function(data) {
                responseText.push(data);
                size += data.length;
            });
            // 数据完成
            response.on('end', function() {
                responseText = Buffer.concat(responseText, size).toString();
                callback(responseText);
            });
        });

        post_req.write(JSON.stringify(req));
        post_req.end();
    },
    // sha1加密密码
    cryptoPw: function(pw) {
        return crypto.createHash('sha1').update(pw).digest('hex');
    }
};
