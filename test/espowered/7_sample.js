'use strict';
var assert = require('power-assert');
var TextVldtr = require('./../../src/text-vldtr');
describe('Monkey test', function () {
    var setting = {};
    setting = {
        minLen: 6,
        maxLen: 10,
        forbidden: [
            'JAPANESE',
            'SYMBOL'
        ],
        required: {
            combineNum: 2,
            kind: [
                'UC_ALPHABET',
                'LC_ALPHABET',
                'NUMBER'
            ]
        },
        acceptOrderANRepeat: false,
        acceptSameANRepeat: false,
        acceptSimpleWord: false
    };
    var t1 = new TextVldtr(setting);
    [
        {
            code: 0,
            text: 'mySecret24',
            msg: 'ok'
        },
        {
            code: 0,
            text: 'macb00kPr0',
            msg: 'ok'
        },
        {
            code: 2,
            text: 'b00k',
            msg: 'ng'
        },
        {
            code: 2,
            text: 'mySecret246',
            msg: 'ng'
        },
        {
            code: 3,
            text: 'NOmacb00k!',
            msg: 'ng'
        },
        {
            code: 4,
            text: '3902849327',
            msg: 'ng'
        },
        {
            code: 5,
            text: 'zoooyeeee2',
            msg: 'ng'
        },
        {
            code: 6,
            text: 'tsrcHoo136',
            msg: 'ng'
        },
        {
            code: 7,
            text: 'myPAsswrd2',
            msg: 'ng'
        }
    ].forEach(function (c) {
        it(c.msg, function () {
            assert.equal(assert._expr(assert._capt(assert._capt(assert._capt(t1, 'arguments/0/object/callee/object').validateText(assert._capt(assert._capt(c, 'arguments/0/object/arguments/0/object').text, 'arguments/0/object/arguments/0')), 'arguments/0/object').code, 'arguments/0'), {
                content: 'assert.equal(t1.validateText(c.text).code, c.code)',
                filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/7_sample.js',
                line: 34
            }), assert._expr(assert._capt(assert._capt(c, 'arguments/1/object').code, 'arguments/1'), {
                content: 'assert.equal(t1.validateText(c.text).code, c.code)',
                filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/7_sample.js',
                line: 34
            }));
        });
    });
});