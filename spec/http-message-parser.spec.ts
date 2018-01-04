import {HttpMessage} from "./support/http-message";
import {HttpMessageParser} from "../src/http-message-parser";

describe('HTTPMessageParser', () => {

    let message_parser: HttpMessageParser;
    beforeEach( () => {
        message_parser = new HttpMessageParser();
    });

    it('Should parse all headers in arrays', () => {
       const http_message : HttpMessage = new HttpMessage();
       http_message.setStatusCode(200);
       http_message.setStatusText('OK');
       http_message.addHeader('test-header', 'value1');
       http_message.addHeader( 'test-header', 'value2');
        http_message.addHeader( 'single-header', 'single');
       const msg = message_parser.parseResponse(http_message.createMessage());
       expect(msg.statusCode).toEqual(200);
       expect(msg.statusMessage).toEqual('OK');
       expect(msg.protocolVersion).toEqual('HTTP/1.1');
       expect(msg.headers['test-header']).toContain('value1');
       expect(msg.headers['test-header']).toContain('value2');
       expect(msg.headers['single-header']).toContain('single');
       expect(msg.headers['single-header'].length).toEqual(1);
    });

    it( 'should lower case all headers', () => {
        const http_message : HttpMessage = new HttpMessage();
        http_message.setStatusCode(200);
        http_message.setStatusText('OK');
        http_message.addHeader('Mixed-Case', 'a');
        http_message.addHeader( 'UPPER-CASE', 'a');
        const msg = message_parser.parseResponse(http_message.createMessage());
        expect(msg.headers['mixed-case']).toBeDefined();
        expect(msg.headers['upper-case']).toBeDefined();
        expect(msg.headers['UPPER-CASE']).not.toBeDefined();
    });
});