'use strict';
var assert = require('power-assert');
var TextVldtr = require('./../../src/text-vldtr');

describe('Email test', function() {
    var setting = {};
    setting = {
    };
    var t1 = new TextVldtr(setting);

    [
        // 結果コードを期待するテキスト
        { code: 0, text: 'foo@example.com', msg: 'ok' },
        { code: 0, text: 'foo@ex@mple.com', msg: 'okじゃないけどok' },
        { code:11, text: 'foo@exmple@com',  msg: 'ng' },
        { code:11, text: '+foo@exe.com',    msg: '+はng' },
        { code:11, text: 'foo+fsa@exe.com', msg: '+はng' },
        { code:11, text: 'foodas+@exe.com', msg: '+はng' },
        { code:11, text: 'fooooooo@fooooo', msg: 'ng' },
        { code:11, text: 'fooooooo@.ooooo', msg: 'ng' },
        { code:11, text: 'foooooooooooo@.', msg: 'ng' },
        { code:11, text: 'foooooooooooooo', msg: 'ng' }
    ].forEach(function(c) {
        it(c.msg, function() {
            assert.equal(t1.validateEmailMayBe(c.text).code, c.code);
        });
    });

});
