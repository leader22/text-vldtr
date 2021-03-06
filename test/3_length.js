'use strict';
var assert = require('power-assert');
var TextVldtr = require('./../../src/text-vldtr');

describe('Length test', function() {
    var setting = {};
    setting = {
        minLen: 0,
        maxLen: 5
    };
    var t1 = new TextVldtr(setting);

    [
        // 結果コードを期待するテキスト
        { code: 0, text: '',       msg: '0文字もok' },
        { code: 0, text: '123',    msg: '範囲内' },
        { code: 0, text: '1',      msg: '範囲内' },
        { code: 0, text: '12345',  msg: '範囲内' },
        { code: 2, text: '123456', msg: '5文字超えたらng' }
    ].forEach(function(c) {
        it(c.msg, function() {
            assert.equal(t1.validateText(c.text).code, c.code);
        });
    });

    setting = {
        minLen: 3,
        maxLen: 8
    };
    var t2 = new TextVldtr(setting);

    [
        { code: 0, text: '123',       msg: '最小' },
        { code: 0, text: '12345',     msg: 'ok' },
        { code: 0, text: '12345678',  msg: 'ok' },
        { code: 2, text: '123456789', msg: '超えたらng' },
        { code: 1, text: '',          msg: '未入力ダメ' }
    ].forEach(function(c) {
        it(c.msg, function() {
            assert.equal(t2.validateText(c.text).code, c.code);
        });
    });

});
