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

    login: function(parsms, callback) {

        var options = {
            url: parsms.url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        };

        //密码加密
        // var pw = this.cryptoPw(parsms.pw);

        var reqData = {
            "loginname": parsms.account,
            "pw": parsms.pw
        }

        //拿到登录地址，根据协议类型，设置不同的option
        var address = url.parse(options.url);
        options.host = address.host;
        options.port = address.port || (address.protocol === 'https:' ? 443 : 80);
        options.path = address.path;

        var requester = address.protocol === 'https:' ? https : http;
        var post_req = requester.request(options, function(response) {
            var responseText = [];
            var size = 0;

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

        post_req.write(JSON.stringify(reqData));
        post_req.end();
    },
    // sha1加密密码
    cryptoPw: function(pw) {
        return crypto.createHash('sha1').update(pw).digest('hex');
    }
};
