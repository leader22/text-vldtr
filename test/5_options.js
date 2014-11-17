'use strict';
var assert = require('power-assert');
var TextVldtr = require('./../src/text-vldtr');

describe('Options test', function() {
    var setting = {};

    describe('acceptSameANRepeat', function() {
        setting = {
            acceptSameANRepeat: false
        };
        var t1 = new TextVldtr(setting);

        [
            // 結果コードを期待するテキスト
            { code: 0, text: 'abcdefg',  msg: 'ok' },
            { code: 0, text: 'aa',       msg: '2連続はok' },
            { code: 0, text: ':::',      msg: '英数字以外はOK' },
            { code: 0, text: 'うおおお', msg: '英数字以外はOK' },
            { code: 5, text: 'aaa',      msg: '3連続以上はng' },
            { code: 5, text: '777',      msg: '3連続以上はng' },
            { code: 5, text: 'aa222cc',  msg: '3連続以上はng' },
            { code: 5, text: 'YAHOOOO',  msg: '3連続以上はng' }
        ].forEach(function(c) {
            it(c.msg, function() {
                assert.equal(t1.validateText(c.text).code, c.code);
            });
        });
    });


    describe('acceptOrderANRepeat', function() {
        setting = {
            acceptOrderANRepeat: false
        };
        var t2 = new TextVldtr(setting);

        [
            // 結果コードを期待するテキスト
            { code: 0, text: 'aa',      msg: 'ok' },
            { code: 0, text: 'ab',      msg: 'ok' },
            { code: 6, text: 'abcdefg', msg: '並んだらng' },
            { code: 6, text: 'abc',     msg: '3文字からng' },
            { code: 6, text: 'cba',     msg: '逆でもng' },
            { code: 6, text: '0123',    msg: '数字もng' },
            { code: 6, text: '987',     msg: '逆でもng' },
        ].forEach(function(c) {
            it(c.msg, function() {
                assert.equal(t2.validateText(c.text).code, c.code);
            });
        });
    });


    describe('acceptSimpleWord', function() {
        setting = {
            acceptSimpleWord: false
        };
        var t3 = new TextVldtr(setting);

        [
            // 結果コードを期待するテキスト
            { code: 0, text: 'hogehoge', msg: 'ok' },
            { code: 7, text: 'password', msg: 'ng' },
            { code: 7, text: 'p@ssword', msg: 'ng' },
        ].forEach(function(c) {
            it(c.msg, function() {
                assert.equal(t3.validateText(c.text).code, c.code);
            });
        });
    });

});
