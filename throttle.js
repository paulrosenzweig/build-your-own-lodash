/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds The `func` is invoked with the last arguments
 * provided to the throttled function. Subsequent calls to the throttled
 * function return the result of the last `func` invocation.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `throttle` and `debounce`.
 *
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} The number of milliseconds to throttle invocations to
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', throttle(updatePosition, 100))
 */
export default function throttle(func, wait) {
  let blockCalls = false;
  let needsTrailing = false;
  let nextArgs;
  let result;

  const scheduleInvocation = () =>
    setTimeout(() => {
      if (needsTrailing) {
        needsTrailing = false;
        result = func(...nextArgs);
        scheduleInvocation();
      } else {
        blockCalls = false;
      }
    }, wait);

  return (...args) => {
    nextArgs = args;
    if (blockCalls) {
      needsTrailing = true;
      return result;
    }

    blockCalls = true;
    result = func(...nextArgs);
    scheduleInvocation();
    return result;
  };
}
