'use strict';
var assert = require('power-assert');
var TextVldtr = require('./../../src/text-vldtr');
describe('Char type test', function () {
    var setting = {};
    setting = {
        forbidden: [
            'JAPANESE',
            'SYMBOL'
        ]
    };
    var t1 = new TextVldtr(setting);
    [
        {
            code: 0,
            text: 'abc',
            msg: 'ok'
        },
        {
            code: 0,
            text: '123',
            msg: 'ok'
        },
        {
            code: 0,
            text: 'a1s2d3',
            msg: 'ok'
        },
        {
            code: 0,
            text: 'HOGEHOGE',
            msg: 'ok'
        },
        {
            code: 3,
            text: '\u3042\u3044\u3046\u3048\u304A',
            msg: '\u7981\u6B62\u6587\u5B57'
        },
        {
            code: 3,
            text: '\u3066\u3059\u3068',
            msg: '\u7981\u6B62\u6587\u5B57'
        },
        {
            code: 3,
            text: '\u3066\u3059*&^',
            msg: '\u7981\u6B62\u6587\u5B57'
        },
        {
            code: 3,
            text: 'hoge!!',
            msg: '\u7981\u6B62\u6587\u5B57'
        },
        {
            code: 3,
            text: '\u304C\u30FC\u3093\u3002',
            msg: '\u7981\u6B62\u6587\u5B57'
        },
        {
            code: 3,
            text: '10%',
            msg: '\u7981\u6B62\u6587\u5B57'
        }
    ].forEach(function (c) {
        it(c.msg, function () {
            assert.equal(assert._expr(assert._capt(assert._capt(assert._capt(t1, 'arguments/0/object/callee/object').validateText(assert._capt(assert._capt(c, 'arguments/0/object/arguments/0/object').text, 'arguments/0/object/arguments/0')), 'arguments/0/object').code, 'arguments/0'), {
                content: 'assert.equal(t1.validateText(c.text).code, c.code)',
                filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/4_char-type.js',
                line: 27
            }), assert._expr(assert._capt(assert._capt(c, 'arguments/1/object').code, 'arguments/1'), {
                content: 'assert.equal(t1.validateText(c.text).code, c.code)',
                filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/4_char-type.js',
                line: 27
            }));
        });
    });
    setting = {
        minLen: 2,
        maxLen: 5,
        forbidden: ['SYMBOL'],
        required: {
            combineNum: 1,
            kind: [
                'LC_ALPHABET',
                'NUMBER',
                'JAPANESE'
            ]
        }
    };
    var t2 = new TextVldtr(setting);
    [
        {
            code: 0,
            text: '123',
            msg: 'ok'
        },
        {
            code: 0,
            text: 'aaa',
            msg: 'ok'
        },
        {
            code: 0,
            text: '\u3042\u3044\u3046',
            msg: 'ok'
        },
        {
            code: 0,
            text: 'a12',
            msg: 'ok'
        },
        {
            code: 0,
            text: 'AbC',
            msg: 'ok'
        },
        {
            code: 3,
            text: 'a#s',
            msg: '\u7981\u6B62\u6587\u5B57'
        },
        {
            code: 3,
            text: '#\u3042\u3042',
            msg: '\u7981\u6B62\u6587\u5B57'
        },
        {
            code: 3,
            text: '(_0_)',
            msg: '\u7981\u6B62\u6587\u5B57'
        },
        {
            code: 4,
            text: 'AAA',
            msg: '\u5FC5\u9808\u6587\u5B57\u304C\u306A\u3044'
        }
    ].forEach(function (c) {
        it(c.msg, function () {
            assert.equal(assert._expr(assert._capt(assert._capt(assert._capt(t2, 'arguments/0/object/callee/object').validateText(assert._capt(assert._capt(c, 'arguments/0/object/arguments/0/object').text, 'arguments/0/object/arguments/0')), 'arguments/0/object').code, 'arguments/0'), {
                content: 'assert.equal(t2.validateText(c.text).code, c.code)',
                filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/4_char-type.js',
                line: 55
            }), assert._expr(assert._capt(assert._capt(c, 'arguments/1/object').code, 'arguments/1'), {
                content: 'assert.equal(t2.validateText(c.text).code, c.code)',
                filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/4_char-type.js',
                line: 55
            }));
        });
    });
    setting = {
        required: {
            combineNum: 2,
            kind: [
                'LC_ALPHABET',
                'NUMBER',
                'JAPANESE'
            ]
        }
    };
    var t3 = new TextVldtr(setting);
    [
        {
            code: 0,
            text: 'a1',
            msg: 'ok'
        },
        {
            code: 0,
            text: '1a',
            msg: 'ok'
        },
        {
            code: 0,
            text: 'a\u304A',
            msg: 'ok'
        },
        {
            code: 0,
            text: '\u554F\u984C\u306A\u3044777',
            msg: 'ok'
        },
        {
            code: 4,
            text: '777',
            msg: '\u5FC5\u9808\u6587\u5B57\u8DB3\u308A\u306A\u3044'
        },
        {
            code: 4,
            text: 'foo',
            msg: '\u5FC5\u9808\u6587\u5B57\u8DB3\u308A\u306A\u3044'
        }
    ].forEach(function (c) {
        it(c.msg, function () {
            assert.equal(assert._expr(assert._capt(assert._capt(assert._capt(t3, 'arguments/0/object/callee/object').validateText(assert._capt(assert._capt(c, 'arguments/0/object/arguments/0/object').text, 'arguments/0/object/arguments/0')), 'arguments/0/object').code, 'arguments/0'), {
                content: 'assert.equal(t3.validateText(c.text).code, c.code)',
                filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/4_char-type.js',
                line: 77
            }), assert._expr(assert._capt(assert._capt(c, 'arguments/1/object').code, 'arguments/1'), {
                content: 'assert.equal(t3.validateText(c.text).code, c.code)',
                filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/4_char-type.js',
                line: 77
            }));
        });
    });
});