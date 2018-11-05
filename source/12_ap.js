/**
 * ap applies a list of functions to a list of values.
 *
 * Dispatches to the `ap` method of the second argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig [a -> b] -> [a] -> [b]
 * @sig Apply f => f (a -> b) -> f a -> f b
 * @sig (r -> a -> b) -> (r -> a) -> (r -> b)
 * @param {*} applyF
 * @param {*} applyX
 * @return {*}
 * @example
 *
 * @symb R.ap([f, g], [a, b]) = [f(a), f(b), g(a), g(b)]
 *
 */
var ap = function ap (...args) {
  let result = [];
  switch (args.length) {
    case 0:
      return ap;
    case 1:
      return ap.bind(this, arguments[0]);
    case 2:
      if (typeof arguments[0] === 'function' && typeof arguments[1] === 'function') {
        return ap.bind(this, arguments[0], arguments[1]);

      } else if (Array.isArray(arguments[0]) && Array.isArray(arguments[1])) {
        arguments[0].forEach(fn => {
          arguments[1].forEach(item => {
            result.push(fn(item));
          });
        });
        return result;
      }
    default:
      for (let i = 0; i < arguments[2].length; i++) {
        result.push(arguments[0](arguments[2][i]));
      }
      for (i = 0; i < arguments[2].length; i++) {
        result.push(arguments[1](arguments[2][i]));
      }
      return result;
  }
};

export default ap;
