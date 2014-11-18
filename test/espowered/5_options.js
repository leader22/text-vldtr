'use strict';
var assert = require('power-assert');
var TextVldtr = require('./../../src/text-vldtr');
describe('Options test', function () {
    var setting = {};
    describe('acceptSameANRepeat', function () {
        setting = { acceptSameANRepeat: false };
        var t1 = new TextVldtr(setting);
        [
            {
                code: 0,
                text: 'abcdefg',
                msg: 'ok'
            },
            {
                code: 0,
                text: 'aa',
                msg: '2\u9023\u7D9A\u306Fok'
            },
            {
                code: 0,
                text: ':::',
                msg: '\u82F1\u6570\u5B57\u4EE5\u5916\u306FOK'
            },
            {
                code: 0,
                text: '\u3046\u304A\u304A\u304A',
                msg: '\u82F1\u6570\u5B57\u4EE5\u5916\u306FOK'
            },
            {
                code: 5,
                text: 'aaa',
                msg: '3\u9023\u7D9A\u4EE5\u4E0A\u306Fng'
            },
            {
                code: 5,
                text: '777',
                msg: '3\u9023\u7D9A\u4EE5\u4E0A\u306Fng'
            },
            {
                code: 5,
                text: 'aa222cc',
                msg: '3\u9023\u7D9A\u4EE5\u4E0A\u306Fng'
            },
            {
                code: 5,
                text: 'YAHOOOO',
                msg: '3\u9023\u7D9A\u4EE5\u4E0A\u306Fng'
            }
        ].forEach(function (c) {
            it(c.msg, function () {
                assert.equal(assert._expr(assert._capt(assert._capt(assert._capt(t1, 'arguments/0/object/callee/object').validateText(assert._capt(assert._capt(c, 'arguments/0/object/arguments/0/object').text, 'arguments/0/object/arguments/0')), 'arguments/0/object').code, 'arguments/0'), {
                    content: 'assert.equal(t1.validateText(c.text).code, c.code)',
                    filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/5_options.js',
                    line: 26
                }), assert._expr(assert._capt(assert._capt(c, 'arguments/1/object').code, 'arguments/1'), {
                    content: 'assert.equal(t1.validateText(c.text).code, c.code)',
                    filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/5_options.js',
                    line: 26
                }));
            });
        });
    });
    describe('acceptOrderANRepeat', function () {
        setting = { acceptOrderANRepeat: false };
        var t2 = new TextVldtr(setting);
        [
            {
                code: 0,
                text: 'aa',
                msg: 'ok'
            },
            {
                code: 0,
                text: 'ab',
                msg: 'ok'
            },
            {
                code: 6,
                text: 'abcdefg',
                msg: '\u4E26\u3093\u3060\u3089ng'
            },
            {
                code: 6,
                text: 'abc',
                msg: '3\u6587\u5B57\u304B\u3089ng'
            },
            {
                code: 6,
                text: 'cba',
                msg: '\u9006\u3067\u3082ng'
            },
            {
                code: 6,
                text: '0123',
                msg: '\u6570\u5B57\u3082ng'
            },
            {
                code: 6,
                text: '987',
                msg: '\u9006\u3067\u3082ng'
            }
        ].forEach(function (c) {
            it(c.msg, function () {
                assert.equal(assert._expr(assert._capt(assert._capt(assert._capt(t2, 'arguments/0/object/callee/object').validateText(assert._capt(assert._capt(c, 'arguments/0/object/arguments/0/object').text, 'arguments/0/object/arguments/0')), 'arguments/0/object').code, 'arguments/0'), {
                    content: 'assert.equal(t2.validateText(c.text).code, c.code)',
                    filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/5_options.js',
                    line: 49
                }), assert._expr(assert._capt(assert._capt(c, 'arguments/1/object').code, 'arguments/1'), {
                    content: 'assert.equal(t2.validateText(c.text).code, c.code)',
                    filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/5_options.js',
                    line: 49
                }));
            });
        });
    });
    describe('acceptSimpleWord', function () {
        setting = { acceptSimpleWord: false };
        var t3 = new TextVldtr(setting);
        [
            {
                code: 0,
                text: 'hogehoge',
                msg: 'ok'
            },
            {
                code: 7,
                text: 'password',
                msg: 'ng'
            },
            {
                code: 7,
                text: 'p@ssword',
                msg: 'ng'
            }
        ].forEach(function (c) {
            it(c.msg, function () {
                assert.equal(assert._expr(assert._capt(assert._capt(assert._capt(t3, 'arguments/0/object/callee/object').validateText(assert._capt(assert._capt(c, 'arguments/0/object/arguments/0/object').text, 'arguments/0/object/arguments/0')), 'arguments/0/object').code, 'arguments/0'), {
                    content: 'assert.equal(t3.validateText(c.text).code, c.code)',
                    filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/5_options.js',
                    line: 68
                }), assert._expr(assert._capt(assert._capt(c, 'arguments/1/object').code, 'arguments/1'), {
                    content: 'assert.equal(t3.validateText(c.text).code, c.code)',
                    filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/5_options.js',
                    line: 68
                }));
            });
        });
    });
});