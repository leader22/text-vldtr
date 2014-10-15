var test = require('tape');
var TextVldtr = require('./../src/text-vldtr');

test('Export test', function(t) {
    t.ok(TextVldtr, 'エクスポートされてる');

    t.equal(typeof TextVldtr, 'function', 'クラス(Function)である');

    t.end();
});

var test = require('tape');
var TextVldtr = require('./../src/text-vldtr');

test('Base test', function(t) {
    var t1 = new TextVldtr(),
        t2 = new TextVldtr();
    t.notEqual(t1, t2, '別インスタンスが返る');

    setting = {
        required: {
            combineNum: 1,
            kind: ['NUMBER', 'UC_ALPHABET']
        },
        useStrictMode: true
    };
    t.doesNotThrow(function() { new TextVldtr(setting) }, 'ルールok')

    var setting = {
        minLen: 4,
        maxLen: 3
    };
    t.throws(function() { new TextVldtr(setting) }, 'ルールがng')

    setting = {
        required: {
            combineNum: 3,
            kind: ['NUMBER']
        }
    };
    t.throws(function() { new TextVldtr(setting) }, 'ルールがng')

    setting = {
        forbidden: ['SYMBOLS']
    };
    t.throws(function() { new TextVldtr(setting) }, 'ルールがng')

    setting = {
        required: {
            combineNum: 3,
            kind: ['JAPANEEEEEEEESE']
        }
    };
    t.throws(function() { new TextVldtr(setting) }, 'ルールがng')

    setting = {
        forbidden: ['NUMBER'],
        required: {
            kind: ['NUMBER']
        }
    };
    t.throws(function() { new TextVldtr(setting) }, 'ルールがng')

    setting = {
        forbidden: ['SYMBOL'],
        useStrictMode: true
    };
    t.throws(function() { new TextVldtr(setting) }, 'ルールがng')

    setting = {
        forbidden: ['SYMBOL'],
        required: {
            kind: ['NUMBER']
        },
        useStrictMode: true
    };
    t.throws(function() { new TextVldtr(setting) }, 'ルールがng')

    t.end();
});

var test = require('tape');
var TextVldtr = require('./../src/text-vldtr');

test('Length test', function(t) {
    var setting = {};
    setting = {
        minLen: 0,
        maxLen: 5
    };
    var t1 = new TextVldtr(setting);
    console.log('Rule:', setting);

    [
        // 結果コードを期待するテキスト
        { code: 0, text: '',       msg: '0文字もok' },
        { code: 0, text: '123',    msg: '範囲内' },
        { code: 0, text: '1',      msg: '範囲内' },
        { code: 0, text: '12345',  msg: '範囲内' },
        { code: 2, text: '123456', msg: '5文字超えたらng' }
    ].forEach(function(c) {
        t.equal(t1.validateText(c.text).code, c.code, (c.msg || undefined));
    });


    setting = {
        minLen: 3,
        maxLen: 8
    };
    var t2 = new TextVldtr(setting);
    console.log('Rule:', setting);

    [
        { code: 0, text: '123',       msg: '最小' },
        { code: 0, text: '12345',     msg: 'ok' },
        { code: 0, text: '12345678',  msg: 'ok' },
        { code: 2, text: '123456789', msg: '超えたらng' },
        { code: 1, text: '',          msg: '未入力ダメ' }
    ].forEach(function(c) {
        t.equal(t2.validateText(c.text).code, c.code, (c.msg || undefined));
    });

    t.end();
});

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

var test = require('tape');
var TextVldtr = require('./../src/text-vldtr');

test('Char type test', function(t) {
    var setting = {};
    setting = {
        acceptSameANRepeat: false
    };
    var t1 = new TextVldtr(setting);
    console.log('Rule:', setting);

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
        t.equal(t1.validateText(c.text).code, c.code, (c.msg || undefined));
    });


    setting = {
        acceptOrderANRepeat: false
    };
    var t2 = new TextVldtr(setting);
    console.log('Rule:', setting);

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
        t.equal(t2.validateText(c.text).code, c.code, (c.msg || undefined));
    });


    setting = {
        acceptSimpleWord: false
    };
    var t3 = new TextVldtr(setting);
    console.log('Rule:', setting);

    [
        // 結果コードを期待するテキスト
        { code: 0, text: 'hogehoge', msg: 'ok' },
        { code: 7, text: 'password', msg: 'ng' },
        { code: 7, text: 'p@ssword', msg: 'ng' },
    ].forEach(function(c) {
        t.equal(t3.validateText(c.text).code, c.code, (c.msg || undefined));
    });

    t.end();
});

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
        { code:11, text: '+foo@exe.com',    msg: '+はng' },
        { code:11, text: 'foo+fsa@exe.com', msg: '+はng' },
        { code:11, text: 'foodas+@exe.com', msg: '+はng' },
        { code:11, text: 'fooooooo@fooooo', msg: 'ng' },
        { code:11, text: 'fooooooo@.ooooo', msg: 'ng' },
        { code:11, text: 'foooooooooooo@.', msg: 'ng' },
        { code:11, text: 'foooooooooooooo', msg: 'ng' }
    ].forEach(function(c) {
        t.equal(t1.validateEmailMayBe(c.text).code, c.code, (c.msg || undefined));
    });

    t.end();
});

var test = require('tape');
var TextVldtr = require('./../src/text-vldtr');

test('Free sample test', function(t) {
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
    console.log('Rule:', setting);

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
        t.equal(t1.validateText(c.text).code, c.code, (c.msg || undefined));
    });

    t.end();
});

var test = require('tape');
var TextVldtr = require('./../src/text-vldtr');

test('Strict mode test', function(t) {
    var setting = {};
    setting = {
        useStrictMode: true,
        required: {
            kind: ['NUMBER']
        }
    };
    var t1 = new TextVldtr(setting);
    console.log('Rule:', setting);

    [
        // 結果コードを期待するテキスト
        { code: 0, text: '1234567',  msg: 'ok' },
        { code: 8, text: 'asdasoj',  msg: 'ng文字' },
        { code: 8, text: 'a1b2c3d',  msg: 'ng文字' }
    ].forEach(function(c) {
        t.equal(t1.validateText(c.text).code, c.code, (c.msg || undefined));
    });


    setting = {
        useStrictMode: true,
        required: {
            combineNum: 2,
            kind: ['UC_ALPHABET', 'LC_ALPHABET', 'NUMBER', 'SYMBOL']
        }
    };
    var t2 = new TextVldtr(setting);
    console.log('Rule:', setting);

    [
        // 結果コードを期待するテキスト
        { code: 0, text: '5aG67!ds',  msg: 'ok' },
        { code: 0, text: '5a67s334',  msg: 'ok' },
        { code: 4, text: '*#^$&^*@',  msg: 'ok' },
        { code: 8, text: '1      1',  msg: 'ng文字' },
        { code: 8, text: '( ･ั﹏･ั)o',  msg: 'ng文字' }
    ].forEach(function(c) {
        t.equal(t2.validateText(c.text).code, c.code, (c.msg || undefined));
    });

    t.end();
});

