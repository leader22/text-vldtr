'use strict';
var assert = require('power-assert');
var TextVldtr = require('./../../src/text-vldtr');
describe('Base test', function () {
    it('\u5225\u30A4\u30F3\u30B9\u30BF\u30F3\u30B9\u304C\u8FD4\u308B', function () {
        var t1 = new TextVldtr(), t2 = new TextVldtr();
        assert.notEqual(assert._expr(assert._capt(t1, 'arguments/0'), {
            content: 'assert.notEqual(t1, t2)',
            filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/2_base.js',
            line: 10
        }), assert._expr(assert._capt(t2, 'arguments/1'), {
            content: 'assert.notEqual(t1, t2)',
            filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/2_base.js',
            line: 10
        }));
    });
    describe('\u30B3\u30F3\u30B9\u30C8\u30E9\u30AF\u30BF\u5F15\u6570\u306E\u30C6\u30B9\u30C8: OK\u30D1\u30BF\u30FC\u30F3', function () {
        var setting = {};
        it('\u554F\u984C\u306A\u3057', function () {
            setting = {
                required: {
                    combineNum: 1,
                    kind: [
                        'NUMBER',
                        'UC_ALPHABET'
                    ]
                },
                useStrictMode: true
            };
            assert.doesNotThrow(function () {
                new TextVldtr(setting);
            });
        });
    });
    describe('\u30B3\u30F3\u30B9\u30C8\u30E9\u30AF\u30BF\u5F15\u6570\u306E\u30C6\u30B9\u30C8: NG\u30D1\u30BF\u30FC\u30F3', function () {
        var setting = {};
        it('min > max', function () {
            setting = {
                minLen: 4,
                maxLen: 3
            };
            assert.throws(function () {
                new TextVldtr(setting);
            });
        });
        it('conbineNum > kind.length', function () {
            setting = {
                required: {
                    combineNum: 3,
                    kind: ['NUMBER']
                }
            };
            assert.throws(function () {
                new TextVldtr(setting);
            });
        });
        it('required\u306A\u3057', function () {
            setting = { forbidden: ['SYMBOLS'] };
            assert.throws(function () {
                new TextVldtr(setting);
            });
        });
        it('\u7121\u52B9\u306Akind', function () {
            setting = {
                required: {
                    combineNum: 3,
                    kind: ['JAPANEEEEEEEESE']
                }
            };
            assert.throws(function () {
                new TextVldtr(setting);
            });
        });
        it('forbidden\u306B\u3082required\u306B\u3082\u3042\u308B', function () {
            setting = {
                forbidden: ['NUMBER'],
                required: { kind: ['NUMBER'] }
            };
            assert.throws(function () {
                new TextVldtr(setting);
            });
        });
        it('strict\u306A\u306E\u306B\u8A18\u53F7\u7981\u6B62', function () {
            setting = {
                forbidden: ['SYMBOL'],
                useStrictMode: true
            };
            assert.throws(function () {
                new TextVldtr(setting);
            });
        });
        it('strict\u306A\u306E\u306Brequired', function () {
            setting = {
                forbidden: ['SYMBOL'],
                required: { kind: ['NUMBER'] },
                useStrictMode: true
            };
            assert.throws(function () {
                new TextVldtr(setting);
            });
        });
    });
});