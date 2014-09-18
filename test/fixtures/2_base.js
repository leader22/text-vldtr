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
