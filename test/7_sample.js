'use strict';
var assert = require('power-assert');
var TextVldtr = require('./../../src/text-vldtr');

describe('Monkey test', function() {
    var setting = {};
    setting = {
        minLen: 6,
        maxLen: 10,
        forbidden: ['JAPANESE', 'SYMBOL'],
        required: {
            combineNum: 2,
            kind: ['UC_ALPHABET', 'LC_ALPHABET', 'NUMBER']
        },
        acceptOrderANRepeat: false,
        acceptSameANRepeat:  false,
        acceptSimpleWord:    false
    };
    var t1 = new TextVldtr(setting);

    [
        // 結果コードを期待するテキスト
        { code: 0, text: 'mySecret24',  msg: 'ok' },
        { code: 0, text: 'macb00kPr0',  msg: 'ok' },
        { code: 2, text: 'b00k',        msg: 'ng' },
        { code: 2, text: 'mySecret246', msg: 'ng' },
        { code: 3, text: 'NOmacb00k!',  msg: 'ng' },
        { code: 4, text: '3902849327',  msg: 'ng' },
        { code: 5, text: 'zoooyeeee2',  msg: 'ng' },
        { code: 6, text: 'tsrcHoo136',  msg: 'ng' },
        { code: 7, text: 'myPAsswrd2',  msg: 'ng' }
    ].forEach(function(c) {
        it(c.msg, function() {
            assert.equal(t1.validateText(c.text).code, c.code);
        });
    });

});
