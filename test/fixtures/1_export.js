var test = require('tape');
var TextVldtr = require('./../src/text-vldtr');

test('Export test', function (t) {

    t.ok(TextVldtr, 'エクスポートされてる');
    t.equal(typeof TextVldtr, 'function', 'クラス(Function)である');

    t.end();
});
