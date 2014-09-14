var test = require('tape');
var TextVldtr = require('./../src/text-vldtr');

test('Char type test', function(t) {
    var setting = {};
    setting = {
        forbidden: ['JAPANESE', 'SYMBOL']
    };
    var t1 = new TextVldtr(setting);
    console.log('Rule:', setting);

    [
        // 結果コードを期待するテキスト
        { code: 0, text: 'abc',        msg: 'ok' },
        { code: 0, text: '123',        msg: 'ok' },
        { code: 0, text: 'a1s2d3',     msg: 'ok' },
        { code: 0, text: 'HOGEHOGE',   msg: 'ok' },
        { code: 3, text: 'あいうえお', msg: '禁止文字' },
        { code: 3, text: 'てすと',     msg: '禁止文字' },
        { code: 3, text: 'てす*&^',    msg: '禁止文字' },
        { code: 3, text: 'hoge!!',     msg: '禁止文字' },
        { code: 3, text: 'がーん。',   msg: '禁止文字' },
        { code: 3, text: '10%',        msg: '禁止文字' }
    ].forEach(function(c) {
        t.equal(t1.validateText(c.text).code, c.code, (c.msg || undefined));
    });


    setting = {
        minLen: 2,
        maxLen: 5,
        forbidden: ['SYMBOL'],
        required: {
            combineNum: 1,
            kind: ['LC_ALPHABET', 'NUMBER', 'JAPANESE']
        }
    };
    var t2 = new TextVldtr(setting);
    console.log('Rule:', setting);

    [
        { code: 0, text: '123',    msg: 'ok' },
        { code: 0, text: 'aaa',    msg: 'ok' },
        { code: 0, text: 'あいう', msg: 'ok' },
        { code: 0, text: 'a12',    msg: 'ok' },
        { code: 0, text: 'AbC',    msg: 'ok' },
        { code: 3, text: 'a#s',    msg: '禁止文字' },
        { code: 3, text: '#ああ',  msg: '禁止文字' },
        { code: 3, text: '(_0_)',  msg: '禁止文字' },
        { code: 4, text: 'AAA',    msg: '必須文字がない' }
    ].forEach(function(c) {
        t.equal(t2.validateText(c.text).code, c.code, (c.msg || undefined));
    });


    setting = {
        required: {
            combineNum: 2,
            kind: ['LC_ALPHABET', 'NUMBER', 'JAPANESE']
        }
    };
    var t3 = new TextVldtr(setting);
    console.log('Rule:', setting);

    [
        { code: 0, text: 'a1',          msg: 'ok' },
        { code: 0, text: '1a',          msg: 'ok' },
        { code: 0, text: 'aお',         msg: 'ok' },
        { code: 0, text: '問題ない777', msg: 'ok' },
        { code: 4, text: '777',         msg: '必須文字足りない' },
        { code: 4, text: 'foo',         msg: '必須文字足りない' },
    ].forEach(function(c) {
        t.equal(t3.validateText(c.text).code, c.code, (c.msg || undefined));
    });


    t.end();
});
