'use strict';
var assert = require('power-assert');
var TextVldtr = require('./../src/text-vldtr');

describe('Export test', function() {

    it('クラス(Function)である', function () {
        assert(typeof TextVldtr === 'function');
    });
});
