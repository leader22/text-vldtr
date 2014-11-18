'use strict';
var assert = require('power-assert');
var TextVldtr = require('./../../src/text-vldtr');
describe('Strict mode test', function () {
    var setting = {};
    describe('case1', function () {
        setting = {
            useStrictMode: true,
            required: { kind: ['NUMBER'] }
        };
        var t1 = new TextVldtr(setting);
        [
            {
                code: 0,
                text: '1234567',
                msg: 'ok'
            },
            {
                code: 8,
                text: 'asdasoj',
                msg: 'ng\u6587\u5B57'
            },
            {
                code: 8,
                text: 'a1b2c3d',
                msg: 'ng\u6587\u5B57'
            }
        ].forEach(function (c) {
            it(c.msg, function () {
                assert.equal(assert._expr(assert._capt(assert._capt(assert._capt(t1, 'arguments/0/object/callee/object').validateText(assert._capt(assert._capt(c, 'arguments/0/object/arguments/0/object').text, 'arguments/0/object/arguments/0')), 'arguments/0/object').code, 'arguments/0'), {
                    content: 'assert.equal(t1.validateText(c.text).code, c.code)',
                    filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/8_strict.js',
                    line: 24
                }), assert._expr(assert._capt(assert._capt(c, 'arguments/1/object').code, 'arguments/1'), {
                    content: 'assert.equal(t1.validateText(c.text).code, c.code)',
                    filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/8_strict.js',
                    line: 24
                }));
            });
        });
    });
    describe('case2', function () {
        setting = {
            useStrictMode: true,
            required: {
                combineNum: 2,
                kind: [
                    'UC_ALPHABET',
                    'LC_ALPHABET',
                    'NUMBER',
                    'SYMBOL'
                ]
            }
        };
        var t2 = new TextVldtr(setting);
        [
            {
                code: 0,
                text: '5aG67!ds',
                msg: 'ok'
            },
            {
                code: 0,
                text: '5a67s334',
                msg: 'ok'
            },
            {
                code: 4,
                text: '*#^$&^*@',
                msg: 'ok'
            },
            {
                code: 8,
                text: '1      1',
                msg: 'ng\u6587\u5B57'
            },
            {
                code: 8,
                text: '( \uFF65\u0E31\uFE4F\uFF65\u0E31)o',
                msg: 'ng\u6587\u5B57'
            }
        ].forEach(function (c) {
            it(c.msg, function () {
                assert.equal(assert._expr(assert._capt(assert._capt(assert._capt(t2, 'arguments/0/object/callee/object').validateText(assert._capt(assert._capt(c, 'arguments/0/object/arguments/0/object').text, 'arguments/0/object/arguments/0')), 'arguments/0/object').code, 'arguments/0'), {
                    content: 'assert.equal(t2.validateText(c.text).code, c.code)',
                    filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/8_strict.js',
                    line: 48
                }), assert._expr(assert._capt(assert._capt(c, 'arguments/1/object').code, 'arguments/1'), {
                    content: 'assert.equal(t2.validateText(c.text).code, c.code)',
                    filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/8_strict.js',
                    line: 48
                }));
            });
        });
    });
});