/**
 * Adds two values.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 * @example
 *
 *      R.add(2, 3);       //=>  5
 *      R.add(7)(10);      //=> 17
 */

var add = function add(...values) {
  if (values.length === 1) {
    return add.bind(this, values[0]);
  } else if (values.length > 1) {
    return Number(values[0]) + Number(values[1]);
  } else {
    return add;
  }
};

export default add;
