var R = require('../source');
var eq = require('./shared/eq');
// var _isArrayLike = require('../source/internal/_isArrayLike');
/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      _isArrayLike([]); //=> true
 *      _isArrayLike(true); //=> false
 *      _isArrayLike({}); //=> false
 *      _isArrayLike({length: 10}); //=> false
 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */
var _isArrayLike = function(x) {
  if (Array.isArray(x)) return true;
  if (!x || typeof x !== 'object') return false;
  return false;
};

var T = function() {
  return true;
};

var identity = function(x) {
  return x;
};

var none = function() {
  if (arguments.length < 1) {
    return none;
  } else if (arguments.length < 2) {
    return none.bind(this, arguments[0]);
  } else {
    for (var i = 0; i < arguments[1].length; i++) {
      if (arguments[0](arguments[1][i])) {
        return false;
      }
    }
    return true;
  }
};

describe('until', function() {
  xit('applies fn until pred is satisfied', function() {
    eq(R.until(R.gt(R.__, 100), R.multiply(2), 1), 128);
  });

  it('works with lists', function() {
    eq(R.until(none(_isArrayLike), R.chain(identity))([1, [2], [[3]]]), [1, 2, 3]);
  });

  it('ignores fn if predicate is always true', function() {
    eq(R.until(T, T, false), false);
  });

});
