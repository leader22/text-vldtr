var test = require('tape');
var TextVldtr = require('./../src/text-vldtr');

test('Email test', function(t) {
    var setting = {};
    setting = {
    };
    var t1 = new TextVldtr(setting);
    console.log('Rule:', setting);

    [
        // 結果コードを期待するテキスト
        { code: 0, text: 'foo@example.com', msg: 'ok' },
        { code: 0, text: 'foo@ex@mple.com', msg: 'okじゃないけどok' },
        { code:11, text: 'foo@exmple@com',  msg: 'ng' },
        { code:11, text: 'fooooooo@fooooo', msg: 'ng' },
        { code:11, text: 'fooooooo@.ooooo', msg: 'ng' },
        { code:11, text: 'foooooooooooo@.', msg: 'ng' },
        { code:11, text: 'foooooooooooooo', msg: 'ng' }
    ].forEach(function(c) {
        t.equal(t1.validateEmailMayBe(c.text).code, c.code, (c.msg || undefined));
    });

    t.end();
});
