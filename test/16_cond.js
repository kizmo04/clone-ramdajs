var R = require('../source');
var eq = require('./shared/eq');
var equals0 = function (x) {
  return x === 0;
};
var equals50 = function (x) {
  return x === 50;
};
var equals100 = function (x) {
  return x === 100;
};
var always = function (x) {
  return x || true;
};
var logger = function (x) {
  return `water temperature is ${x}°C`
};
var nAry = function (n, fn) {
  function nAried () {
    var args = Array.prototype.slice.call(arguments, n);
    return fn(...args);
  }
  Object.defineProperty(nAried, 'length', { value: n });
  return nAried;
};

describe('cond', function() {
  it('returns a function', function() {
    eq(typeof R.cond([]), 'function');
  });

  it('returns a conditional function', function() {

    var fn = R.cond([
      [equals0,   logger],
      [equals100, logger],
      [equals50,           function(temp) { return 'nothing special happens at ' + temp + '°C'; }]
    ]);
    eq(fn(0), 'water temperature is 0°C');
    eq(fn(50), 'nothing special happens at 50°C');
    eq(fn(100), 'water temperature is 100°C');
  });

  it('returns a function which returns undefined if none of the predicates matches', function() {
    var fn = R.cond([
      [equals50, logger],
      [equals100, logger]
    ]);
    eq(fn('quux'), undefined);
  });

  it('predicates are tested in order', function() {
    var fn = R.cond([
      [always, always.bind(this, 'foo')],
      [always, always.bind(this, 'bar')],
      [always, always.bind(this, 'baz')]
    ]);
    eq(fn(), 'foo');
  });

  it('forwards all arguments to predicates and to transformers', function() {
    var fn = R.cond([
      [function(_, x) { return x === 42; }, function() { return arguments.length; }]
    ]);
    eq(fn(21, 42, 84), 3);
  });

  it('retains highest predicate arity', function() {
    var fn = R.cond([
      [nAry(2, always), always],
      [nAry(3, always), always],
      [nAry(1, always), always]
    ]);
    eq(fn.length, 3);
  });

});
