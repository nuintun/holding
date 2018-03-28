/**
 * @module index
 * @license MIT
 * @version 2018/03/28
 */

'use strict';

/**
 * @function apply
 * @description Faster apply, call is faster than apply, optimize less than 6 args
 * @param  {Function} fn
 * @param  {any} context
 * @param  {Array|arguments} args
 * @see https://github.com/micro-js/apply
 * @see http://blog.csdn.net/zhengyinhui100/article/details/7837127
 */
function apply(fn, context, args) {
  switch (args.length) {
    // Faster
    case 0:
      return fn.call(context);
    case 1:
      return fn.call(context, args[0]);
    case 2:
      return fn.call(context, args[0], args[1]);
    case 3:
      return fn.call(context, args[0], args[1], args[2]);
    default:
      // Slower
      return fn.apply(context, args);
  }
}

/**
 * @function holding
 * @param {number} n
 * @param {Function} fn
 * @param {any} context
 * @param {boolean} error
 * @returns {Function}
 */
function holding(n, fn, context, error) {
  // Format fn
  if (typeof fn !== 'function') {
    throw new TypeError('The second arguments must be a function.');
  }

  // Already holding times
  let times = 0;
  // Is fn called
  let called = false;

  // Format Max call times
  n = Math.max(0, n >> 0) + 1;
  // Format context
  context = arguments.length > 2 ? context : null;

  /**
   * @function callback
   */
  function callback() {
    // Times increment
    ++times;

    // Throw range error if error true
    if (error && times > n) {
      throw new RangeError(`Expect to maximum called ${n} times, but got ${times} times.`);
    }

    // Times end
    if (times === n) {
      // Set called
      called = true;

      // Execute fn
      return apply(fn, context, arguments);
    }
  }

  // Define propertys
  Object.defineProperties(callback, {
    /**
     * @property times
     * @description Executed times
     * @returns {number}
     */
    times: {
      configurable: false,
      get: () => times
    },
    /**
     * @property called
     * @description Is fn called
     * @returns {boolean}
     */
    called: {
      configurable: false,
      get: () => called
    }
  });

  // Return callback function
  return callback;
}

/**
 * @function holding
 * @param {number} n
 * @param {Function} fn
 * @param {any} context
 * @returns {Function}
 */
module.exports = (n, fn, context) => holding(n, fn, context, false);

/**
 * @function assert
 * @description Assertion testing
 * @param {number} n
 * @param {Function} fn
 * @param {any} context
 * @returns {Function}
 */
Object.defineProperty(module.exports, 'assert', {
  configurable: false,
  value: (n, fn, context) => holding(n, fn, context, true)
});
