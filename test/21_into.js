var R = require('../source');
var eq = require('./shared/eq');
import _ from 'lodash';

var filter = function(test, list) {
  if (!test) {
    return filter;
  } else if (!list) {
    return filter.bind(this, test);
  } else {
    return _.filter(list, test);
  }
};

var identity = function(x) {
  return x;
};

var take = function(n, list) {
  if (arguments.length === 0) {
    return take;
  } else if (arguments.length < 2) {
    return take.bind(this, arguments[0]);
  } else {
    if (Array.isArray(list)) {
      return list.slice(0, n);
    } else if (typeof list === 'string') {
      return list.substr(0, n);
    } else {
      return {
        xf: list,
        n: n
      };
    }
  }
};

describe('into', function() {
  var add = R.add;
  var isOdd = function(b) {return b % 2 === 1;};

  it('transduces into arrays', function() {
    eq(R.into([], R.map(add(1)), [1, 2, 3, 4]), [2, 3, 4, 5]);
    eq(R.into([], filter(isOdd), [1, 2, 3, 4]), [1, 3]);
    eq(R.into([], R.compose(R.map(add(1)), take(2)), [1, 2, 3, 4]), [2, 3]);
  });

  it('transduces into strings', function() {
    eq(R.into('', R.map(add(1)), [1, 2, 3, 4]), '2345');
    eq(R.into('', filter(isOdd), [1, 2, 3, 4]), '13');
    eq(R.into('', R.compose(R.map(add(1)), take(2)), [1, 2, 3, 4]), '23');
  });

  it('transduces into objects', function() {
    eq(R.into({}, identity, [['a', 1], ['b', 2]]), {a: 1, b: 2});
    eq(R.into({}, identity, [{a: 1}, {b: 2, c: 3}]), {a: 1, b: 2, c: 3});
  });

});
