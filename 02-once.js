/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls
 * to the function return the value of the first invocation. The `func` is
 * invoked with the `this` binding and arguments of the created function.
 *
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * const initialize = once(createApplication)
 * initialize()
 * initialize()
 * // => `createApplication` is invoked once
 */
export default function once(func) {
  let hasExecuted = false;
  let result;

  return (...args) => {
    if (hasExecuted) return result;
    hasExecuted = true;
    result = func(...args);
    return result;
  };
}
