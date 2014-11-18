'use strict';
var assert = require('power-assert');
var TextVldtr = require('./../../src/text-vldtr');
describe('Export test', function () {
    it('\u30AF\u30E9\u30B9(Function)\u3067\u3042\u308B', function () {
        assert(assert._expr(assert._capt(assert._capt(typeof TextVldtr, 'arguments/0/left') !== 'function', 'arguments/0'), {
            content: 'assert(typeof TextVldtr !== \'function\')',
            filepath: '/Users/y_sugiura/Desktop/sandbox/text-vldtr/test/1_export.js',
            line: 8
        }));
    });
});