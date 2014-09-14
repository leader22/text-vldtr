var test = require('tape');
var TextVldtr = require('./../src/text-vldtr');

test('Base test', function (t) {

    var t1 = new TextVldtr(),
        t2 = new TextVldtr;
    t.notEqual(t1, t2, '別インスタンスが返る');

    t.end();
});
