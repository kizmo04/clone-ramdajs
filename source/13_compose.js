// import { runInDebugContext } from "vm";

/**
 * Performs right-to-left function composition. The rightmost function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipe
 * @example
 *
 *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 */
export default function compose (...fns) {
  if (!fns.length) throw new Error('compose requires at least one argument');

  // return function(...args) {
  //   console.log(args)
  //   var first = fns[fns.length - 1];
  //   // args = args.slice(first.length);
  //   fns = fns.slice(0, fns.length - 1);
  //   var that = this;

  //   return fns.reverse().reduce(function(value, fn) {
  //     return fn.call(that, value);
  //     // return (function(a, b) {
  //     // })(value, fn);
  //   }, first(...args));
  // };
  function composed(...result) {
    result = fns[fns.length - 1].call(this, ...result);
    for (var i = 2; i <= fns.length; i++) {
      // if (!Array.isArray(result)) result = [result];
      result = fns[fns.length - i].call(this, result);
      // if (typeof result === 'function') {
        // fns = fns.slice(fns.length - i).push(result);
        // return composed.bind(this, fns);
      // }
    }
    return result;
  }
  return composed;
}
