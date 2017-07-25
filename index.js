/*!
 * holding
 * Date: 2016/7/4
 * https://github.com/nuintun/holding
 *
 * This is licensed under the MIT License (MIT).
 * For details, see: https://github.com/nuintun/holding/blob/master/LICENSE
 */

'use strict';

// vars
var toString = Object.prototype.toString;
var defineProperty = Object.defineProperty;

/**
 * type
 *
 * @param {Any} value
 * @returns {String}
 */
function type(value) {
  return toString.call(value);
}

/**
 * holding
 *
 * @param {Int} n
 * @param {Function} fn
 * @param {Any} context
 * @returns {Function}
 */
function holding(n, fn, context) {
  // format n
  if (type(n) !== '[object Number]' && !isFinite(n)) {
    throw new TypeError('The first arguments must be a finite int number.');
  }

  // format fn
  if (type(fn) !== '[object Function]') {
    throw new TypeError('The second arguments must be a function.');
  }

  // already holding times
  var times = 0;
  // is fn called
  var called = false;

  // max call times
  n = Math.max(0, n);

  /**
   * proxy
   */
  function proxy() {
    // times end
    if (times === n) {
      // call fn immediate
      proxy.immediate.apply(context, arguments);
    } else if (times > n) {
      // throw error for test framework
      throw new RangeError('Expect to holding ' + n + ' times, but got ' + times + ' times.');
    }

    // times increment
    ++times;
  }

  // executed times
  defineProperty(proxy, 'times', {
    get: function() {
      return times;
    }
  });

  // is fn called
  defineProperty(proxy, 'called', {
    get: function() {
      return called;
    }
  });

  // execute the fn immediate
  defineProperty(proxy, 'immediate', {
    value: function() {
      if (!called) {
        // set called
        called = true;

        // execute fn
        return fn.apply(context, arguments);
      }
    }
  });

  // return proxy function
  return proxy;
}

// exports
module.exports = holding;
