var R = require('../source');
var eq = require('./shared/eq');

describe('chain', function() {
  function dec(x) { return [x - 1]; }
  function times2(x) { return [x * 2]; }

  it('maps a function over a nested list and returns the (shallow) flattened result', function() {
    eq(R.chain(times2, [1, 2, 3, 1, 0, 10, -3, 5, 7]), [2, 4, 6, 2, 0, 20, -6, 10, 14]);
    eq(R.chain(times2, [1, 2, 3]), [2, 4, 6]);
  });

  it('does not flatten recursively', function() {
    function f(xs) {
      return xs[0] ? [xs[0]] : [];
    }
    eq(R.chain(f, [[1], [[2], 100], [], [3, [4]]]), [1, [2], 3]);
  });

  it('composes', function() {
    var mdouble = R.chain(times2);
    var mdec = R.chain(dec);
    eq(mdec(mdouble([10, 20, 30])), [19, 39, 59]);
  });

});
