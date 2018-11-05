var R = require('../source');
var eq = require('./shared/eq');
var divFrom100 = R.divide(100);


describe('divide', function() {
  it('divides two numbers', function() {
    eq(R.divide(28, 7), 4);
  });

  it('coerces its arguments to numbers', function() {
    eq(R.divide('2', '1'), 2);
    eq(R.divide(2, '1'), 2);
    eq(R.divide(null, true), 0);
    eq(R.divide(undefined, undefined), NaN);
    eq(R.divide(new Date(4), new Date(2)), 2);
    eq(R.divide([], 1), 0);
    eq(R.divide('', 4), 0);
  });

  it('is composable', function () {
    eq(typeof R.divide(9), 'function');
    eq(R.divide(9)(3), 3);
    eq(R.divide(10)(2), 5);
  });

  it('curried', function() {
    eq(divFrom100(5), 20);
  });
});
