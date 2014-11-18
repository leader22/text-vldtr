'use strict';
var assert = require('power-assert');
var TextVldtr = require('./../../src/text-vldtr');
describe('Email test', function () {
    var setting = {};
    setting = {};
    var t1 = new TextVldtr(setting);
    [
        {
            code: 0,
            text: 'foo@example.com',
            msg: 'ok'
        },
        {
            code: 0,
            text: 'foo@ex@mple.com',
            msg: 'ok\u3058\u3083\u306A\u3044\u3051\u3069ok'
        },
        {
            code: 11,
            text: 'foo@exmple@com',
            msg: 'ng'
        },
        {
            code: 11,
            text: '+foo@exe.com',
            msg: '+\u306Fng'
        },
        {
            code: 11,
            text: 'foo+fsa@exe.com',
            msg: '+\u306Fng'
        },
        {
            code: 11,
            text: 'foodas+@exe.com',
            msg: '+\u306Fng'
        },
        {
            code: 11,
            text: 'fooooooo@fooooo',
            msg: 'ng'
        },
        {
            code: 11,
            text: 'fooooooo@.ooooo',
            msg: 'ng'
        },
        {
            code: 11,
            text: 'foooooooooooo@.',
            msg: 'ng'
        },
        {
            code: 11,
            text: 'foooooooooooooo',
            msg: 'ng'
        }
    ].forEach(function (c) {
        it(c.msg, function () {
            assert.equal(assert._expr(assert._capt(assert._capt(assert._capt(t1, 'arguments/0/object/callee/object').validateEmailMayBe(assert._capt(assert._capt(c, 'arguments/0/object/arguments/0/object').text, 'arguments/0/object/arguments/0')), 'arguments/0/object').code, 'arguments/0'), {
                content: 'assert.equal(t1.validateEmailMayBe(c.text).code, c.code)',
                filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/6_email.js',
                line: 25
            }), assert._expr(assert._capt(assert._capt(c, 'arguments/1/object').code, 'arguments/1'), {
                content: 'assert.equal(t1.validateEmailMayBe(c.text).code, c.code)',
                filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/6_email.js',
                line: 25
            }));
        });
    });
});