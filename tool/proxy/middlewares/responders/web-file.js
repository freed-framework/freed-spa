var utils = require('../../utils');
var url = require('url');
var log = require('../../log');
var qs=require('querystring');

function respondFromWebFile(filePath, req, res, next) {
    log.debug('respond with web file: ' + filePath);

    // Fix the host of request header to the web file's host
    var remoteHost = url.parse(filePath).host;
    req.headers && (req.headers.host = remoteHost);

    var options = {
        url: filePath,
        method: req.method,
        headers: req.headers
    };
    var respondFromWebSuccess = function (err, data, proxyRes) {
        if (err) {
            throw err;
        }
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        res.write(data);
        res.end();
    };

    if (req.method == 'POST' || req.method === 'PUT') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            //req.headers['Content-Length']=body.length;
            req.headers['Content-Type']=req.headers['content-type'] || 'application/json; charset=UTF-8';
            // req.headers['x-did']='huawei';
            // req.headers['x-app-version']='8.0';
            // req.headers['x-client']='mga';

            options['data'] = body;
            console.log(options);
            utils.request(options, respondFromWebSuccess);
        });
    } else {
        utils.request(options, respondFromWebSuccess);
    }
}

module.exports = respondFromWebFile;

