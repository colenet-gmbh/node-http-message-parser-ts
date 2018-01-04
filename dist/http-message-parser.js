"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpMessageParser {
    parseResponse(responseString) {
        const response = {};
        const lines = responseString.split(/\r?\n/);
        const parsedStatusLine = this.parseStatusLine(lines.shift());
        response['protocolVersion'] = parsedStatusLine['protocol'];
        response['statusCode'] = +parsedStatusLine['statusCode'];
        response['statusMessage'] = parsedStatusLine['statusMessage'];
        const headerLines = [];
        while (lines.length > 0) {
            const line = lines.shift();
            if (line === "") {
                break;
            }
            headerLines.push(line);
        }
        response['headers'] = this.parseHeaders(headerLines);
        response['body'] = lines.join('\r\n');
        return response;
    }
    parseHeaders(headerLines) {
        const headers = {};
        for (const line of headerLines) {
            const parts = line.split(':');
            const key = parts.shift().toLowerCase();
            const val = parts.join(':').trim();
            if (headers[key] === undefined) {
                headers[key] = [val];
            }
            else {
                headers[key].push(val);
            }
        }
        return headers;
    }
    parseStatusLine(statusLine) {
        const parts = statusLine.match(/^(.+) ([0-9]{3}) (.*)$/);
        const parsed = {};
        if (parts != null) {
            parsed['protocol'] = parts[1];
            parsed['statusCode'] = parts[2];
            parsed['statusMessage'] = parts[3];
        }
        return parsed;
    }
}
exports.HttpMessageParser = HttpMessageParser;
//# sourceMappingURL=http-message-parser.js.map