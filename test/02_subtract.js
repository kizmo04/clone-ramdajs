var R = require('../source');
var eq = require('./shared/eq');
var subFrom100 = R.subtract(100);


describe('subtract', function() {
  it('subtracts two numbers', function() {
    eq(R.subtract(22, 7), 15);
  });

  it('coerces its arguments to numbers', function() {
    eq(R.subtract('1', '2'), -1);
    eq(R.subtract(1, '2'), -1);
    eq(R.subtract(true, false), 1);
    eq(R.subtract(null, null), 0);
    eq(R.subtract(undefined, undefined), NaN);
    eq(R.subtract(new Date(1), new Date(2)), -1);
    eq(R.subtract(4, []), 4);
    eq(R.subtract('', 4), -4);
  });

  it('is composable', function () {
    eq(typeof R.subtract(3), 'function');
    eq(R.subtract(3)(3), 0);
    eq(R.subtract(10)(3), 7);
  });

  it('curried', function() {
    eq(subFrom100(5), 95);
  });
});
