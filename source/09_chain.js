/**
 * `chain` maps a function over a list and concatenates the results. `chain`
 * is also known as `flatMap` in some libraries.
 *
 * Dispatches to the `chain` method of the second argument, if present,
 * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
 *
 * If second argument is a function, `chain(f, g)(x)` is equivalent to `f(g(x), x)`.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain m => (a -> m b) -> m a -> m b
 * @param {Function} fn The function to map with
 * @param {Array} list The list to map over
 * @return {Array} The result of flat-mapping `list` with `fn`
 * @example
 *
 *      const duplicate = n => [n, n];
 *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
 *
 */
var R = require('../source');

var chain = function chain(...args) {
  var result = [];
  switch (args.length) {
    case 0:
      return chain;
    case 1:
      return chain.bind(this, args[0]);
    case 2:
      if (typeof args[1] === 'function') {
        var arg = R.compose(args[0], args[1]);
        return chain.bind(this, arg);
      } else if (Array.isArray(args[1])) {
        args[1].forEach(item => {
          if (Array.isArray(args[0](item))) {
            args[0](item).forEach(v => {
              result.push(v);
            });
          } else {
            result.push(args[0](item));
          }
        });
        return result;
      }
    default:
      args[1](args[2]).forEach(item => {
        if (Array.isArray(args[0](item))) {
          args[0](item).forEach(v => {
            result.push(v);
          });
        } else {
          result.push(args[0](item));
        }
      });
      return result;
  }
};

export default chain;
