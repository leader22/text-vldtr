'use strict';
var assert = require('power-assert');
var TextVldtr = require('./../src/text-vldtr');

describe('Strict mode test', function() {
    var setting = {};

    describe('case1', function() {
        setting = {
            useStrictMode: true,
            required: {
                kind: ['NUMBER']
            }
        };
        var t1 = new TextVldtr(setting);

        [
            // 結果コードを期待するテキスト
            { code: 0, text: '1234567',  msg: 'ok' },
            { code: 8, text: 'asdasoj',  msg: 'ng文字' },
            { code: 8, text: 'a1b2c3d',  msg: 'ng文字' }
        ].forEach(function(c) {
            it(c.msg, function() {
                assert.equal(t1.validateText(c.text).code, c.code);
            });
        });
    });

    describe('case2', function() {
        setting = {
            useStrictMode: true,
            required: {
                combineNum: 2,
                kind: ['UC_ALPHABET', 'LC_ALPHABET', 'NUMBER', 'SYMBOL']
            }
        };
        var t2 = new TextVldtr(setting);

        [
            // 結果コードを期待するテキスト
            { code: 0, text: '5aG67!ds',  msg: 'ok' },
            { code: 0, text: '5a67s334',  msg: 'ok' },
            { code: 4, text: '*#^$&^*@',  msg: 'ok' },
            { code: 8, text: '1      1',  msg: 'ng文字' },
            { code: 8, text: '( ･ั﹏･ั)o',  msg: 'ng文字' }
        ].forEach(function(c) {
            it(c.msg, function() {
                assert.equal(t2.validateText(c.text).code, c.code);
            });
        });
    });

});

