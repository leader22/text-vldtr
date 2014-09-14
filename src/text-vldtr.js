;(function(global) {
    'use strict';

    // 定数 ---------------------------------------------------------------------------
    var AVAILABLE_CHARACTERS = [
        'JAPANESE',    // 日本語(詳細は後述の正規表現を参照)
        'NUMBER',      // 0-9
        'SYMBOL',      // 記号(詳細は後述の正規表現を参照)
        'LC_ALPHABET', // 英字(小文字)
        'UC_ALPHABET'  // 英字(大文字)
    ];
    var VALIDATION_RESULTS = {
        VALID: {
            code:    0,
            codeStr: 'VALID',
            detail:  'Input text is valid.'
        },
        IS_EMPTY: {
            code:    1,
            codeStr: 'IS_EMPTY',
            detail:  'Input text has no length.(maybe empty)'
        },
        INVALID_LENGTH: {
            code:    2,
            codeStr: 'INVALID_LENGTH',
            detail:  'Input text is too short or too long.'
        },
        FORBIDDEN_CHARACTER: {
            code:    3,
            codeStr: 'FORBIDDEN_CHARACTER',
            detail:  'Input text has forbidden character.'
        },
        INVALID_COMBINATION: {
            code:    4,
            codeStr: 'INVALID_COMBINATION',
            detail:  'Input text does not have valid combination.'
        },
        HAS_SAME_AN_REPEATED: {
            code:    5,
            codeStr: 'HAS_SAME_AN_REPEATED',
            detail:  'Input text has same A/N repeatedly some times.'
        },
        HAS_ORDER_REPEATED_AN: {
            code:    6,
            codeStr: 'HAS_ORDER_REPEATED_AN',
            detail:  'Input text has A/N repeatedly ordered.'
        },
        HAS_SIMPLE_WORD: {
            code:    7,
            codeStr: 'HAS_SIMPLE_WORD',
            detail:  'Input text has some simple word.'
        },
        MAY_NOT_BE_EMAIL: {
            code:    11,
            codeStr: 'MAY_NOT_BE_EMAIL',
            detail:  'Input text may not be an email address.'
        }
    };
    var UC_ALPHABET_RE      = /[A-Z]/,
        LC_ALPHABET_RE      = /[a-z]/,
        NUMBER_RE           = /[0-9]/,
        JAPANESE_RE         = /[亜-熙ぁ-んァ-ヶ]/,
        SYMBOL_RE           = /[\[\]!@#\$%^&\*?_,~\"\$\'\(\)=\|\-\;\:\.\/\`\{\}\+\>\\ ]/,
        SAME_AN_REPEATED_RE = /([a-zA-Z0-9])\1\1/, // さすがに2文字続くのはある(ex. google, yahoo)
        SIMPLEST_EMAIL_RE   = /.+@.+\..+/;
    var ORDER_REPEEATED_CHARS_LIST = [
        'abcdefghijklmnopqrstuvwxyzabc',
        'zyxwvutsrqponmlkjihgfedcbazyx',
        '1234567890123',
        '0987654321098'
    ];
    var SIMPLE_WORD_LIST = [
        'pass',
        'p@ss',
    ];
    var CHECK_FUNC = {
        // 日本語が入ってるかチェック
        JAPANESE: function(txt) {
            return JAPANESE_RE.test(txt);
        },
        // 数字が入ってるかチェック
        NUMBER: function(txt) {
            return NUMBER_RE.test(txt);
        },
        // 記号が入ってるかチェック
        SYMBOL: function(txt) {
            return SYMBOL_RE.test(txt);
        },
        // 英字の小文字が入ってるかチェック
        LC_ALPHABET: function(txt) {
            return LC_ALPHABET_RE.test(txt);
        },
        // 英字の大文字が入ってるかチェック
        UC_ALPHABET: function(txt) {
            return UC_ALPHABET_RE.test(txt);
        },
        // aaa みたく同じ文字が3連続で続いてるかチェック
        SAME_AN_REPEATED: function(txt) {
            return SAME_AN_REPEATED_RE.test(txt);
        },
        // abc みたく順序よく3連続で続いてるかチェック
        ORDER_REPEEATED_AN: function(txt) {
            // さすがに2文字続くのはある(ex. absolute, hit, src)
            var times = 3;

            var i, l, j, ll,
                chars, checkRange, repeatRe;
            i = 0, l = ORDER_REPEEATED_CHARS_LIST.length;
            for (; i < l; i++) {
                chars = ORDER_REPEEATED_CHARS_LIST[i];
                j = 0, ll = chars.length;
                for (; j < ll; j++) {
                    checkRange = chars.substr(j, times);
                    if (checkRange.length === times) {
                        repeatRe = new RegExp(checkRange, 'i');
                        if (repeatRe.test(txt)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        },
        // 安易に想像できる文字が入ってないかチェック
        HAS_SIMPLE_WORD: function(txt) {
            var i = 0, l = SIMPLE_WORD_LIST.length,
                checkRe;
            for (; i < l; i++) {
                checkRe = new RegExp(SIMPLE_WORD_LIST[i], 'i');
                if (checkRe.test(txt)) {
                    return true;
                }
            }
            return false;
        }
    };
    // 定義されてるタイプを弾く
    function __isUnavailableKind(kind) {
        return (AVAILABLE_CHARACTERS.indexOf(kind) < 0);
    }


    // クラス -------------------------------------------------------------------------
    /**
     * 文字列を、コンストラクタに渡されたルールでチェックしてくれるやつ
     *
     * - 日本語
     * - 英数字(大/小文字)
     * - 記号
     * 以上を任意に組み合わせてチェックできる
     *
     * - 同じ文字が3回続いたらアウト
     * - abcのように並んだらアウト
     * - すごく簡単な単語のリストに該当したらアウト
     * という機能もある
     *
     * すごい雑なロジックで、複雑さを点数で表す機能もある
     *
     * @class TextVldtr
     * @param {Object} [rules]
     *     バリデーションの設定オブジェクト
     * @param {Number} [rules.minLen]
     *     最短文字数
     * @param {Number} [rules.maxLen]
     *     最長文字数
     * @param {Array[String]} [rules.forbidden]
     *     禁止とする文字タイプの配列
     * @param {Object} [rules.required]
     *     必須とする文字タイプのオブジェクト
     * @param {Array[String]} [rules.required.kind]
     *     必須とする文字タイプの配列
     * @param {Number} [rules.required.combineNum]
     *     必須とする組み合わせの数
     * @param {Boolean} [rules.acceptOrderANRepeat]
     *     abcのような並びを許容するならtrue、デフォルトはtrue
     * @param {Boolean} [rules.acceptSameANRepeat]
     *     aaaのような並びを許容するならtrue、デフォルトはtrue
     * @param {Boolean} [rules.acceptSimpleWord]
     *     passのような簡単な単語を許容するならtrue、デフォルトはtrue
     */
    var TextVldtr = function(rules) {
        rules = rules || {};

        this.minLen              = rules.minLen              || 0;
        this.maxLen              = rules.maxLen              || Infinity;
        this.forbidden           = rules.forbidden           || [];
        this.required            = rules.required            || { kind: [], combineNum: 0 };
        this.acceptOrderANRepeat = rules.acceptOrderANRepeat !== false ? true : false;
        this.acceptSameANRepeat  = rules.acceptSameANRepeat  !== false ? true : false;
        this.acceptSimpleWord    = rules.acceptSimpleWord    !== false ? true : false;

        this._checkRules();
    };

    TextVldtr.prototype = {
        constructor:           TextVldtr,
        validateText:          _validateText,
        validateEmailMayBe:    _validateEmailMayBe,
        getAvailableKinds:     _getAvailableKinds,
        getComplexityScore:    _getComplexityScore,

        _checkRules:           _checkRules,
        _isEmpty:              _isEmpty,
        _isInvalidLen:         _isInvalidLen,
        _isInvalidCombination: _isInvalidCombination,
        _hasForbiddenChar:     _hasForbiddenChar,
        _hasSameANRepeated:    _hasSameANRepeated,
        _hasOrderRepeatedAN:   _hasOrderRepeatedAN,
        _hasSimpleWord:        _hasSimpleWord
    };

    /**
     * 与えられたバリデーションのルールがおかしくないかチェック
     *
     * 不備がある場合はエラーを投げる
     *
     * @member TextVldtr
     * @method checkRules
     */
    function _checkRules() {
        var i, l, kinds, kindMap = {};

        if (this.minLen > this.maxLen) {
            throw new Error('maxLen is lower than minLen.');
        }

        if (this.required.kind.length < this.required.combineNum) {
            throw new Error('Required combineNum is bigger than required kind types.');
        }

        kinds = this.forbidden;
        if (kinds.length) {
            for (i = 0, l = kinds.length; i < l; i++) {
                if (__isUnavailableKind(kinds[i])) {
                    throw new Error('Invalid kind was found in forbidden types.');
                }
            }
        }

        kinds = this.required.kind;
        if (kinds.length) {
            for (i = 0, l = kinds.length; i < l; i++) {
                if (__isUnavailableKind(kinds[i])) {
                    throw new Error('Invalid kind was found in required types.');
                }
            }
        }

        kinds = this.forbidden.concat(this.required.kind);
        if (kinds.length) {
            for (i = 0, l = kinds.length; i < l; i++) {
                if (kinds[i] in kindMap) {
                    throw new Error('Some kind duplicated in required and forbidden.');
                } else {
                    kindMap[kinds[i]] = 1;
                }
            }
        }
    }

    /**
     * 与えられたテキストをバリデートする
     *
     * 結果に関わらず、内容に応じて結果オブジェクトを返す
     *
     * @member TextVldtr
     * @method validateText
     * @param {String} txt
     *     バリデートする文字列
     * @return {Object}
     *     バリデートした結果オブジェクト
     */
    function _validateText(txt) {
        if (this._isEmpty(txt))              { return VALIDATION_RESULTS.IS_EMPTY; }
        if (this._isInvalidLen(txt))         { return VALIDATION_RESULTS.INVALID_LENGTH; }
        if (this._hasForbiddenChar(txt))     { return VALIDATION_RESULTS.FORBIDDEN_CHARACTER; }
        if (this._isInvalidCombination(txt)) { return VALIDATION_RESULTS.INVALID_COMBINATION; }
        if (this._hasSameANRepeated(txt))    { return VALIDATION_RESULTS.HAS_SAME_AN_REPEATED; }
        if (this._hasOrderRepeatedAN(txt))   { return VALIDATION_RESULTS.HAS_ORDER_REPEATED_AN; }
        if (this._hasSimpleWord(txt))        { return VALIDATION_RESULTS.HAS_SIMPLE_WORD; }

        return VALIDATION_RESULTS.VALID;
    }

    /**
     * 厳密ではないが、おそらくメールアドレスと思われる文字列かどうかバリデートする
     *
     * なんか文字列@なんか文字列.なんか文字列 ならtrue
     *
     * @member TextVldtr
     * @method validateEmailMayBe
     * @param {String} txt
     *     バリデートする文字列
     * @return {Object}
     *     バリデートした結果オブジェクト
     */
    function _validateEmailMayBe(txt) {
        return (SIMPLEST_EMAIL_RE.test(txt)) ? VALIDATION_RESULTS.VALID
                                             : VALIDATION_RESULTS.MAY_NOT_BE_EMAIL;
    }

    /**
     * 使用できる文字タイプを取得する
     *
     * 何が使えるか知りたい時用
     *
     * @member TextVldtr
     * @method getAvailableKinds
     * @return {Array|String}
     *     文字タイプのキーが入った配列
     */
    function _getAvailableKinds() {
        return AVAILABLE_CHARACTERS;
    }

    /**
     * 文字の複雑さをスコアで取得する
     *
     * ロジックは適当なのであくまで参考程度
     *
     * @member TextVldtr
     * @method getComplexityScore
     * @param {String} txt
     *     チェックする文字列
     * @return {Object}
     *     チェック結果のオブジェクト(スコア(1-N)とランク(1-5))
     */
    function _getComplexityScore(txt) {
        var ret = {},
            score = 1, rank = 1;

        // まず文字数でベースのスコアをつける
        score += (txt.length/3)|0;

        // 組み合わせがあればあるほど加点
        var i = 0, l = AVAILABLE_CHARACTERS.length,
            kind, checker;
        for (; i < l; i++) {
            kind = AVAILABLE_CHARACTERS[i],
            checker = CHECK_FUNC[kind];

            if (checker(txt)) {
                score += 3;
            }
        }

        // 安易なものは減点
        if (this._hasSameANRepeated(txt))    { score -= 3; }
        if (this._hasOrderRepeatedAN(txt))   { score -= 3; }
        if (this._hasSimpleWord(txt))        { score -= 2; }

        // 空は論外
        if (this._isEmpty(txt))              { score = 0; }

        // スコアに応じてランクつける
             if (score > 15) { rank = 5; }
        else if (score > 12) { rank = 4; }
        else if (score >  9) { rank = 3; }
        else if (score >  5) { rank = 2; }

        ret = {
            score: score,
            rank:  rank
        };
    }

    /**
     * 文字列が空じゃないかをチェックする
     *
     * @member TextVldtr
     * @method isEmpty
     * @param {String} txt
     *     チェックする文字列
     * @return {Boolean}
     *     チェック結果
     */
    function _isEmpty(txt) {
        // 0文字でもOKって明示されてたら無視
        if (this.minLen === 0) { return false; }
        if (txt.length === 0) { return true; }

        return false;
    }

    /**
     * 文字列の長さに問題ないかをチェックする
     *
     * @member TextVldtr
     * @method isInvalidLen
     * @param {String} txt
     *     チェックする文字列
     * @return {Boolean}
     *     チェック結果
     */
    function _isInvalidLen(txt) {
        // min未満はアウト
        if (txt.length < this.minLen) { return true; }
        // max未満でないとダメ
        if (this.maxLen &&
            txt.length > this.maxLen) { return true; }

        return false;
    }

    /**
     * 文字タイプの組み合わせをチェックする
     *
     * @member TextVldtr
     * @method isInvalidCombination
     * @param {String} txt
     *     チェックする文字列
     * @return {Boolean}
     *     チェック結果
     */
    function _isInvalidCombination(txt) {
        var required = this.required.kind,
            combineNum = this.required.combineNum,
            hitNum = 0;
        var i = 0, l = required.length,
            kind, checker;
        for (; i < l; i++) {
            kind = required[i],
            checker = CHECK_FUNC[kind];

            checker(txt) && hitNum++;
        }

        if (combineNum > hitNum) { return true; }
        return false;
    }

    /**
     * 禁止されてる文字タイプがないかをチェックする
     *
     * @member TextVldtr
     * @method hasForbiddenChar
     * @param {String} txt
     *     チェックする文字列
     * @return {Boolean}
     *     チェック結果
     */
    function _hasForbiddenChar(txt) {
        var forbidden = this.forbidden;
        var i = 0, l = forbidden.length,
            kind, checker;
        for (; i < l; i++) {
            kind = forbidden[i];
            checker = CHECK_FUNC[kind];

            if (checker(txt)) { return true; }
        }
        return false;
    }

    /**
     * 同じ文字が連続してないかをチェックする
     *
     * aaaや000など、特定の位置を切り出して3つ並んでたらアウト
     *
     * @member TextVldtr
     * @method hasSameANRepeated
     * @param {String} txt
     *     チェックする文字列
     * @return {Boolean}
     *     チェック結果
     */
    function _hasSameANRepeated(txt) {
        // 許容するなら無視
        if (this.acceptSameANRepeat) { return false; }
        var checker = CHECK_FUNC.SAME_AN_REPEATED;

        if (checker(txt)) { return true; }
        return false;
    }

    /**
     * 文字がabcみたく連続してないかをチェックする
     *
     * abcやcbaなど、特定の位置を切り出して3つ並んでたらアウト
     *
     * @member TextVldtr
     * @method hasOrderRepeatedAN
     * @param {String} txt
     *     チェックする文字列
     * @return {Boolean}
     *     チェック結果
     */
    function _hasOrderRepeatedAN(txt) {
        // 許容するなら無視
        if (this.acceptOrderANRepeat) { return false; }
        var checker = CHECK_FUNC.ORDER_REPEEATED_AN;

        if (checker(txt)) { return true; }
        return false;
    }

    /**
     * 安易に想像できる文字が入ってないかをチェックする
     *
     * @member TextVldtr
     * @method hasSimpleWord
     * @param {String} txt
     *     チェックする文字列
     * @return {Boolean}
     *     チェック結果
     */
    function _hasSimpleWord(txt) {
        // 許容するなら無視
        if (this.acceptSimpleWord) { return false; }
        var checker = CHECK_FUNC.HAS_SIMPLE_WORD;

        if (checker(txt)) { return true; }
        return false;
    }


    // プライベート -------------------------------------------------------------------


    // エクスポート -------------------------------------------------------------------
    var __isAMD      = (typeof global.define === 'function') && global.define.amd;
    var __isCommonJS = (typeof global.exports === 'object') && global.exports;
    var __isNode     = ('process' in global);

    if (__isAMD) {
        define([], function () {
            return TextVldtr;
        });
    } else if (__isCommonJS || __isNode) {
        module.exports = TextVldtr;
    } else {
        global.TextVldtr = TextVldtr;
    }

}(this.self || global));
