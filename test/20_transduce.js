var R = require('../source');
var eq = require('./shared/eq');
import _ from 'lodash';

var flip = function(fn) {
  return function(...args) {
    var temp;
    temp = args[0];
    args[0] = args[1];
    args[1] = temp;
    return fn.apply(this, args);
  };
};
var append = function(source, target) {
  if (!source) {
    return append;
  } else if (!target) {
    return append.bind(this, source);
  } else {
    target.push(source);
    return target;
  }
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
var filter = function(test, list) {
  if (!test) {
    return filter;
  } else if (!list) {
    return filter.bind(this, test);
  } else {
    return _.filter(list, test);
  }
};

var inc = function(x) {
  return ++x;
};

var merge = function(target, source) {
  if (arguments.length < 1) {
    return merge;
  } else if (arguments.length < 2) {
    return merge.bind(this, arguments[0]);
  } else {
    for (var key in source) {
      target[key] = source[key];
    }
    return target;
  }
};

var identity = function(x) {
  return x;
};

var concat = function() {
  if (arguments.length < 1) {
    return concat;
  } else if (arguments.length < 2) {
    return concat.bind(this, arguments[0]);
  } else {
    if (typeof arguments[0] !== typeof arguments[1] && (!Array.isArray(arguments[0] || !typeof arguments[0] === 'string'))) {
      throw new Error();
    }
    var result = '';

    if (Array.isArray(arguments[0])) result = [];

    return result.concat(arguments[0]).concat(arguments[1]);
  }
};

describe('transduce', function() {
  var add = R.add;
  var mult = function(a, b) {return a * b;};
  var isOdd = function(b) {return b % 2 === 1;};
  var addxf = {
    '@@transducer/step': function(acc, x) { return acc + x; },
    '@@transducer/init': function() { return 0; },
    '@@transducer/result': function(x) { return x; }
  };

  var listxf = {
    '@@transducer/step': function(acc, x) { return acc.concat([x]); },
    '@@transducer/init': function() { return []; },
    '@@transducer/result': function(x) { return x; }
  };

  var multxf = {
    '@@transducer/step': function(acc, x) { return acc * x; },
    '@@transducer/init': function() { return 1; },
    '@@transducer/result': function(x) { return x; }
  };

  var toxf = function(fn) {
    return function(xf) {
      return {
        f: fn,
        '@@transducer/step': xf['@@transducer/step'],
        '@@transducer/result': xf['@@transducer/result'],
        xf: xf
      };
    };
  };

  it('transduces into arrays', function() {

    eq(R.transduce(R.map(add(1)), flip(append), [], [1, 2, 3, 4]), [2, 3, 4, 5]);
    eq(R.transduce(filter(isOdd), flip(append), [],  [1, 2, 3, 4]), [1, 3]);
    eq(R.transduce(R.compose(R.map(add(1)), take(2)), flip(append), [],  [1, 2, 3, 4]), [2, 3]);
    eq(R.transduce(R.compose(filter(isOdd), take(1)), flip(append), [],  [1, 2, 3, 4]), [1]);
  });

  it('transduces into strings', function() {
    var _add = function(x, y) { return x + y; };
    eq(R.transduce(R.map(inc), _add, '', [1, 2, 3, 4]), '2345');
    eq(R.transduce(filter(isOdd), _add, '', [1, 2, 3, 4]), '13');
    eq(R.transduce(R.compose(R.map(add(1)), take(2)), _add, '', [1, 2, 3, 4]), '23');
  });

  it('transduces into objects', function() {
    eq(R.transduce(R.map(identity), merge, {}, [{a: 1}, {b: 2, c: 3}]), {a: 1, b: 2, c: 3});
  });

  it('folds transformer objects over a collection with the supplied accumulator', function() {
    eq(R.transduce(toxf(add), addxf, 0, [1, 2, 3, 4]), 10);
    eq(R.transduce(toxf(mult), multxf, 1, [1, 2, 3, 4]), 24);
    eq(R.transduce(toxf(concat), listxf, [0], [1, 2, 3, 4]), [0, 1, 2, 3, 4]);
    eq(R.transduce(toxf(add), add, 0, [1, 2, 3, 4]), 10);
    eq(R.transduce(toxf(mult), mult, 1, [1, 2, 3, 4]), 24);
  });

  xit('dispatches to objects that implement `reduce`', function() {
    var obj = {x: [1, 2, 3], reduce: function() { return 'override'; }};
    eq(R.transduce(R.map(add(1)), add, 0, obj), 'override');
    eq(R.transduce(R.map(add(1)), add, 10, obj), 'override');
  });

  it('returns the accumulator for an empty collection', function() {
    eq(R.transduce(toxf(add), addxf, 0, []), 0);
    eq(R.transduce(toxf(mult), multxf, 1, []), 1);
    eq(R.transduce(toxf(concat), listxf, [], []), []);
  });

});
