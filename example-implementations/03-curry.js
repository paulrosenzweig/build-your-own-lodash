/**
 * Creates a function that accepts arguments of func and either invokes
 * func returning its result, if at least arity number of arguments
 * have been provided, or returns a function that accepts the remaining
 * func arguments, and so on. The arity of func may be specified if
 * func.length is not sufficient.
 *
 * @category Function
 * @param {Function} func The function to curry.
 * @param {number} arity The arity of func.
 * @returns {Function} Returns the new curried function.
 * @example
 *
 * function abc(a, b, c) {
 *   return [a, b, c];
 * };
 *
 * const curried = curry(abc);
 *
 * curried(1)(2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2, 3);
 * // => [1, 2, 3]
 */
export default function curry(f, arity = f.length) {
  const addArgs =
    (args) =>
    (...moreArgs) => {
      const allArgs = args.concat(moreArgs);
      if (allArgs.length >= arity) {
        return f(...allArgs);
      }
      return addArgs(allArgs);
    };
  return addArgs([]);
}
