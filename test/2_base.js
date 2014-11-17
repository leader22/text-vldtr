'use strict';
var assert = require('power-assert');
var TextVldtr = require('./../src/text-vldtr');

describe('Base test', function() {

    it('別インスタンスが返る', function () {
        var t1 = new TextVldtr(),
            t2 = new TextVldtr();
        assert.notEqual(t1, t2);
    });

    describe('コンストラクタ引数のテスト: OKパターン', function() {
        var setting = {};

        it('問題なし', function() {
            setting = {
                required: {
                    combineNum: 1,
                    kind: ['NUMBER', 'UC_ALPHABET']
                },
                useStrictMode: true
            };
            assert.doesNotThrow(function() { new TextVldtr(setting); });
        });
    });

    describe('コンストラクタ引数のテスト: NGパターン', function() {
        var setting = {};

        it('min > max', function() {
            setting = {
                minLen: 4,
                maxLen: 3
            };
            assert.throws(function() { new TextVldtr(setting); });
        });
        it('conbineNum > kind.length', function() {
            setting = {
                required: {
                    combineNum: 3,
                    kind: ['NUMBER']
                }
            };
            assert.throws(function() { new TextVldtr(setting); });
        });
        it('requiredなし', function() {
            setting = {
                forbidden: ['SYMBOLS']
            };
            assert.throws(function() { new TextVldtr(setting); });
        });
        it('無効なkind', function() {
            setting = {
                required: {
                    combineNum: 3,
                    kind: ['JAPANEEEEEEEESE']
                }
            };
            assert.throws(function() { new TextVldtr(setting); });
        });
        it('forbiddenにもrequiredにもある', function() {
            setting = {
                forbidden: ['NUMBER'],
                required: {
                    kind: ['NUMBER']
                }
            };
            assert.throws(function() { new TextVldtr(setting); });
        });
        it('strictなのに記号禁止', function() {
            setting = {
                forbidden: ['SYMBOL'],
                useStrictMode: true
            };
            assert.throws(function() { new TextVldtr(setting); });
        });
        it('strictなのにrequired', function() {
            setting = {
                forbidden: ['SYMBOL'],
                required: {
                    kind: ['NUMBER']
                },
                useStrictMode: true
            };
            assert.throws(function() { new TextVldtr(setting); });
        });

    });
});
