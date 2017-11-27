/**
 * @module index
 * @license MIT
 * @version 2017/11/27
 */

'use strict';

// Vars
const toString = Object.prototype.toString;
const defineProperty = Object.defineProperty;

/**
 * @function type
 * @param {any} value
 * @returns {string}
 */
function type(value) {
  return toString.call(value);
}

/**
 * @function holding
 * @param {number} n
 * @param {Function} fn
 * @param {any} context
 * @returns {Function}
 */
function holding(n, fn, context) {
  // Format n
  if (type(n) !== '[object Number]' || n < 0 || n % 1 !== 0) {
    throw new TypeError('The first arguments must be a natural number.');
  }

  // Format fn
  if (type(fn) !== '[object Function]') {
    throw new TypeError('The second arguments must be a function.');
  }

  // Already holding times
  let times = 0;
  // Is fn called
  let called = false;

  // Format Max call times
  n += 1;
  // Format context
  context = arguments.length > 2 ? context : null;

  /**
   * @function proxy
   */
  function proxy() {
    // Times increment
    ++times;

    // Times end
    if (times === n) {
      // Call fn immediate
      proxy.immediate.apply(null, arguments);
    } else if (times > n) {
      // Throw error for test framework
      throw new RangeError('Expect to maximum called ' + n + ' times, but got ' + times + ' times.');
    } else if (called) {
      // Throw error for test framework
      throw new Error('Callback fn already called by immediate method.');
    }
  }

  /**
   * @function times
   * @description Executed times
   * @returns {number}
   */
  defineProperty(proxy, 'times', {
    configurable: false,
    get: () => {
      return times;
    }
  });

  /**
   * @function called
   * @description Is fn called
   * @returns {boolean}
   */
  defineProperty(proxy, 'called', {
    configurable: false,
    get: () => {
      return called;
    }
  });

  /**
   * @function immediate
   * @description Execute the fn immediate
   */
  defineProperty(proxy, 'immediate', {
    configurable: false,
    value: () => {
      if (!called) {
        // Set called
        called = true;

        // Execute fn
        return fn.apply(context, arguments);
      }
    }
  });

  // Return proxy function
  return proxy;
}

/**
 * @function assert
 * @description Assertion testing
 */
defineProperty(holding, 'assert', {
  configurable: false,
  value: function(n, fn, context) {
    const proxy = holding(n, fn, context);

    return function() {
      try {
        return proxy.apply(null, arguments);
      } catch (error) {
        return fn(error);
      }
    };
  }
});

// Exports
module.exports = holding;
