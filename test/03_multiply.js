var R = require('../source');
var eq = require('./shared/eq');
var mul100 = R.multiply(R.__)(100);
var triple = R.multiply(3);


describe('multiply', function() {
  it('multiplies together two numbers', function() {
    eq(R.multiply(6, 7), 42);
  });

  it('is composable', function() {
    eq(R.multiply(3)(4), 12);
  });

  it('coerces its arguments to numbers', function() {
    eq(R.multiply('')(2), 0);
  });

  xit('uses placeholder', function() {
    eq(mul100(4), 400);
  });

  it('curried', function() {
    eq(triple(5), 15);
  });
});
