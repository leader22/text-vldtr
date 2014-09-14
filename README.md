text-vldtr
==========

See this [demo](http://labs.lealog.net/text-vldtr/)!

## Overview
IDやパスワードなど、その文字列がある一定のルールを満たしているかをチェックする仕組みです。

- 日本語
- 英数字(大/小文字)
- 記号

以上を任意に組み合わせてチェックできるほか、

- 同じ英数字が3回続いたらアウト
- abcや987のように3文字並んだらアウト
- すごく簡単な単語のリストに該当したらアウト

という機能もあります。

パスワードと思わしき文字列に対して、複雑性をスコアにして返す機能もありますが、
ロジックが適当なのでコレは要注意です。

メールアドレスと思わしき文字列を判定する機能もありますが、
もはや正規表現で頑張ってはいけない部分だと思うので、あくまで露払い程度です。

## How to use

```javascript
var rules = {
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
var textVldtr = new TextVldtr(rules);


/**
 * 以下のオブジェクトが返る
 *
 * {
 *     code:    0,
 *     codeStr: 'VALID',
 *     detail:  'Input text is valid.'
 * }
 */
textVldtr.validateText('mySecret24');

/**
 * 以下のオブジェクトが返る
 *
 * {
 *     code:    7,
 *     codeStr: 'HAS_SIMPLE_WORD',
 *     detail:  'Input text has some simple word.'
 * }
 */
textVldtr.validateText('myPasswrd2');
```

## Rules
インスタンス作成の際にオプションとして渡すルールセットです。
必要な設定のみ渡します。

### minLen {Number}
最低文字数の指定です。
``0``以外を指定した場合、``NOT_EMPTY``のチェックが入ります。

### maxLen {Number}
最大文字数の指定です。

### forbidden {Array[String]}
使用禁止とする文字タイプを配列で指定します。

#### 文字タイプ一覧
```javascript
var AVAILABLE_CHARACTERS = [
    'JAPANESE',    // 日本語(詳細は後述の正規表現を参照)
    'NUMBER',      // 0-9
    'SYMBOL',      // 記号(詳細は後述の正規表現を参照)
    'LC_ALPHABET', // 英字(小文字)
    'UC_ALPHABET'  // 英字(大文字)
];
```

### required {Object}
逆に、必須とする文字タイプです。

#### required.kind {Array[String]}
必須とする文字タイプを配列で指定します。

#### required.combineNum {Number}
必須とした文字タイプの内、何種類を組み合わせる必要があるかの指定です。

### acceptOrderANRepeat {Boolean}
デフォルトでは``true``
以下のような文字の並びを許可します。

```
123
678
901
abc
hij
zyx
```

### acceptSameANRepeat {Boolean}
デフォルトでは``true``
以下のような文字の並びを許可します。

```
111
000
aaa
xxx
```

### acceptSimpleWord {Boolean}
デフォルトでは``true``

以下のような文字の並びを許可します。

```
pass
p@ss
```

## Methods

### validateText
文字列を渡すと、バリデート結果のオブジェクトを返します。

#### バリデート結果オブジェクト
以下のキーを持つオブジェクトです。

```javascript
var res = {
    code:    0,                     // 結果の識別コード(数値)
    codeStr: 'VALID',               // 結果の識別コード(文字列)
    detail:  'Input text is valid.' // 結果の詳細説明
}
```

詳細はコード参照。

### validateEmailMayBe
文字列を渡すと、バリデート結果のオブジェクトを返します。

> 厳密にメールアドレスかどうかの判定は行っていません。
> だからMayBeです。
> 空メールを送らせるのが一番確実だと思います・・。

### getAvailableKinds
上述の使用可能な文字タイプが確認できます。

### getComplexityScore
与えられた文字列の複雑性をスコアにして返します。

```javascript
var textVldtr = new TextVldtr();
textVldtr.getComplexityScore('leader22');  // => { score:  9, rank: 2 }
textVldtr.getComplexityScore('#Leader22'); // => { score: 16, rank: 5 }
```

- score: 1-N
- rank:  1-5

> 何度も書きますが、この機能はロジックが適当です！


## License
MIT
