var R = require('../source');
var eq = require('./shared/eq');

describe('add', function() {
  it('adds together two numbers when two arguments are given', function() {
    eq(R.add(3, 7), 10);
  });

  it('is composable', function () {
    eq(typeof R.add(3), 'function');
    eq(R.add(3)(3), 6);
    eq(R.add(10)(3), 13);
  });

  it('coerces its arguments to numbers', function() {
    eq(R.add('1', '2'), 3);
    eq(R.add(1, '2'), 3);
    eq(R.add(true, false), 1);
    eq(R.add(null, null), 0);
    eq(R.add(undefined, undefined), NaN);
    eq(R.add(new Date(1), new Date(2)), 3);
  });
});
