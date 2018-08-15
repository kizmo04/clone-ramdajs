var R = require('../source');
var eq = require('./shared/eq');

describe('ap', function() {
  function mult2(x) { return x * 2; }
  function plus3(x) { return x + 3; }
  function toUpper(x) { return x.toUpperCase(); }
  function concat(x) {
    return function (y) {
      return x + y;
    };
  }

  it('applies a list of functions to a list of values', function() {
    eq(R.ap([mult2, plus3], [1, 2, 3]), [2, 4, 6, 4, 5, 6]);
    eq(R.ap([concat('tasty '), toUpper], ["pizza", "salad"]), ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]);
  });

});
