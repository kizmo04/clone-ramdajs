var assert = require('assert');

var R = require('../source');
var eq = require('./shared/eq');


describe('compose', function() {

  it('is a function', function() {
    eq(typeof R.compose, 'function');
  });

  it('performs right-to-left function composition', function() {
    //  f :: (String, Number?) -> ([Number] -> [Number])
    var f = R.compose(R.map, R.multiply, parseInt);

    eq(f('30')([1, 2, 3]), [30, 60, 90]);
    eq(f('10', 2)([1, 2, 3]), [2, 4, 6]);
  });

  it('passes context to functions', function() {
    function x(val) {
      return this.x * val;
    }
    function y(val) {
      return this.y * val;
    }
    function z(val) {
      return this.z * val;
    }
    var context = {
      a: R.compose(x, y, z),
      x: 4,
      y: 2,
      z: 1
    };
    eq(context.a(5), 40);
  });

  it('throws if given no arguments', function() {
    assert.throws(
      function() { R.compose(); },
      function(err) {
        return err.constructor === Error &&
               err.message === 'compose requires at least one argument';
      }
    );
  });

  it('can be applied to one argument', function() {
    var f = function(a, b, c) { return [a, b, c]; };
    var g = R.compose(f);
    eq(g(1, 2, 3), [1, 2, 3]);
  });

});
