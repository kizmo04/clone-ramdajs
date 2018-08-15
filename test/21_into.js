var R = require('../source');
var eq = require('./shared/eq');


describe('into', function() {
  var add = R.add;
  var isOdd = function(b) {return b % 2 === 1;};

  it('transduces into arrays', function() {
    eq(R.into([], R.map(add(1)), [1, 2, 3, 4]), [2, 3, 4, 5]);
    eq(R.into([], R.filter(isOdd), [1, 2, 3, 4]), [1, 3]);
    eq(R.into([], R.compose(R.map(add(1)), R.take(2)), [1, 2, 3, 4]), [2, 3]);
  });

  it('transduces into strings', function() {
    eq(R.into('', R.map(add(1)), [1, 2, 3, 4]), '2345');
    eq(R.into('', R.filter(isOdd), [1, 2, 3, 4]), '13');
    eq(R.into('', R.compose(R.map(add(1)), R.take(2)), [1, 2, 3, 4]), '23');
  });

  it('transduces into objects', function() {
    eq(R.into({}, R.identity, [['a', 1], ['b', 2]]), {a: 1, b: 2});
    eq(R.into({}, R.identity, [{a: 1}, {b: 2, c: 3}]), {a: 1, b: 2, c: 3});
  });

});
