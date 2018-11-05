/**
 * Negates its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number}
 * @example
 *
 *      R.negate(42); //=> -42
 */
var negate = function negate(n) {
  if (n === 0) {
    return n.toString().length > 1 ? 0 : -0;
  } else {
    return -n;
  }
};

export default negate;
