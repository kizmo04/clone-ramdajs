/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b]
 * @param {Array} list The array to consider.
 * @return {Array} The flattened list.
 * @see R.unnest
 * @example
 *
 *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
 *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */

var flatten = function(list) {
  var result = [];
  for (var i = 0; i < list.length; i++) {
    if (Array.isArray(list[i])) {
      result = result.concat(flatten(list[i]));
    } else {
      result.push(list[i]);
    }
  }
  return result;
};

export default flatten;
