var assert = require('assert');

var R = require('../../source');


module.exports = function(actual, expected) {
  assert.strictEqual(arguments.length, 2);

  if (typeof actual === 'object') {
    assert.strictEqual(JSON.stringify(actual), JSON.stringify(expected));
  } else {
    assert.strictEqual('' + actual, '' + expected);
  }
};
