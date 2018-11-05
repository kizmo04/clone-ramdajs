/**
 * Transforms the items of the list with the transducer and appends the
 * transformed items to the accumulator using an appropriate iterator function
 * based on the accumulator type.
 *
 * The accumulator can be an array, string, object or a transformer. Iterated
 * items will be appended to arrays and concatenated to strings. Objects will
 * be merged directly or 2-item arrays will be merged as key, value pairs.
 *
 * The accumulator can also be a transformer object that provides a 2-arity
 * reducing iterator function, step, 0-arity initial value function, init, and
 * 1-arity result extraction function result. The step function is used as the
 * iterator function in reduce. The result function is used to convert the
 * final accumulator into the return type and in most cases is R.identity. The
 * init function is used to provide the initial accumulator.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the
 * transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig a -> (b -> b) -> [c] -> a
 * @param {*} acc The initial accumulator value.
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.transduce
 * @example
 *
 *      const numbers = [1, 2, 3, 4];
 *      const transducer = R.compose(R.map(R.add(1)), R.take(2));
 *
 *      R.into([], transducer, numbers); //=> [2, 3]
 *
 *      const intoArray = R.into([]);
 *      intoArray(transducer, numbers); //=> [2, 3]
 */

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

var into = function into() {
  function iterator (acc, item) {
    if (Array.isArray(acc)) {
      acc.push(item);
    } else if (typeof acc === 'string') {
      acc += item;
    } else if (typeof acc === 'object' && !acc.length) {
      if (Array.isArray(item)) {
        acc[item[0]] = item[1];
      } else {
        merge(acc, item);
      }
    }
    return acc;
  }
  if (arguments.length < 1) {
    return into;
  } else if (arguments.length < 2) {
    return into.bind(this, arguments[0]);
  } else if (arguments.length < 3) {
    return into.bind(this, arguments[0], arguments[1]);
  } else {
    return arguments[1](arguments[2]).reduce(iterator, arguments[0]);
  }
};

export default into;
