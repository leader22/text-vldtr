'use strict';
var assert = require('power-assert');
var TextVldtr = require('./../../src/text-vldtr');
describe('Length test', function () {
    var setting = {};
    setting = {
        minLen: 0,
        maxLen: 5
    };
    var t1 = new TextVldtr(setting);
    [
        {
            code: 0,
            text: '',
            msg: '0\u6587\u5B57\u3082ok'
        },
        {
            code: 0,
            text: '123',
            msg: '\u7BC4\u56F2\u5185'
        },
        {
            code: 0,
            text: '1',
            msg: '\u7BC4\u56F2\u5185'
        },
        {
            code: 0,
            text: '12345',
            msg: '\u7BC4\u56F2\u5185'
        },
        {
            code: 2,
            text: '123456',
            msg: '5\u6587\u5B57\u8D85\u3048\u305F\u3089ng'
        }
    ].forEach(function (c) {
        it(c.msg, function () {
            assert.equal(assert._expr(assert._capt(assert._capt(assert._capt(t1, 'arguments/0/object/callee/object').validateText(assert._capt(assert._capt(c, 'arguments/0/object/arguments/0/object').text, 'arguments/0/object/arguments/0')), 'arguments/0/object').code, 'arguments/0'), {
                content: 'assert.equal(t1.validateText(c.text).code, c.code)',
                filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/3_length.js',
                line: 22
            }), assert._expr(assert._capt(assert._capt(c, 'arguments/1/object').code, 'arguments/1'), {
                content: 'assert.equal(t1.validateText(c.text).code, c.code)',
                filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/3_length.js',
                line: 22
            }));
        });
    });
    setting = {
        minLen: 3,
        maxLen: 8
    };
    var t2 = new TextVldtr(setting);
    [
        {
            code: 0,
            text: '123',
            msg: '\u6700\u5C0F'
        },
        {
            code: 0,
            text: '12345',
            msg: 'ok'
        },
        {
            code: 0,
            text: '12345678',
            msg: 'ok'
        },
        {
            code: 2,
            text: '123456789',
            msg: '\u8D85\u3048\u305F\u3089ng'
        },
        {
            code: 1,
            text: '',
            msg: '\u672A\u5165\u529B\u30C0\u30E1'
        }
    ].forEach(function (c) {
        it(c.msg, function () {
            assert.equal(assert._expr(assert._capt(assert._capt(assert._capt(t2, 'arguments/0/object/callee/object').validateText(assert._capt(assert._capt(c, 'arguments/0/object/arguments/0/object').text, 'arguments/0/object/arguments/0')), 'arguments/0/object').code, 'arguments/0'), {
                content: 'assert.equal(t2.validateText(c.text).code, c.code)',
                filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/3_length.js',
                line: 40
            }), assert._expr(assert._capt(assert._capt(c, 'arguments/1/object').code, 'arguments/1'), {
                content: 'assert.equal(t2.validateText(c.text).code, c.code)',
                filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/3_length.js',
                line: 40
            }));
        });
    });
});