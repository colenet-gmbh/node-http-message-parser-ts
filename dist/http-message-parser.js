"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpMessageParser = (function () {
    function HttpMessageParser() {
    }
    HttpMessageParser.prototype.parseResponse = function (responseString) {
        var response = {};
        var lines = responseString.split(/\r?\n/);
        var parsedStatusLine = this.parseStatusLine(lines.shift());
        response['protocolVersion'] = parsedStatusLine['protocol'];
        response['statusCode'] = +parsedStatusLine['statusCode'];
        response['statusMessage'] = parsedStatusLine['statusMessage'];
        var headerLines = [];
        while (lines.length > 0) {
            var line = lines.shift();
            if (line === "") {
                break;
            }
            headerLines.push(line);
        }
        response['headers'] = this.parseHeaders(headerLines);
        response['body'] = lines.join('\r\n');
        return response;
    };
    HttpMessageParser.prototype.parseHeaders = function (headerLines) {
        var headers = {};
        for (var _i = 0, headerLines_1 = headerLines; _i < headerLines_1.length; _i++) {
            var line = headerLines_1[_i];
            var parts = line.split(':');
            var key = parts.shift().toLowerCase();
            var val = parts.join(':').trim();
            if (headers[key] === undefined) {
                headers[key] = [val];
            }
            else {
                headers[key].push(val);
            }
        }
        return headers;
    };
    HttpMessageParser.prototype.parseStatusLine = function (statusLine) {
        var parts = statusLine.match(/^(.+) ([0-9]{3}) (.*)$/);
        var parsed = {};
        if (parts != null) {
            parsed['protocol'] = parts[1];
            parsed['statusCode'] = parts[2];
            parsed['statusMessage'] = parts[3];
        }
        return parsed;
    };
    return HttpMessageParser;
}());
exports.HttpMessageParser = HttpMessageParser;
//# sourceMappingURL=http-message-parser.js.map