/*!
 * holding
 * Date: 2016/7/4
 * https://github.com/Nuintun/file-send
 *
 * This is licensed under the MIT License (MIT).
 * For details, see: https://github.com/Nuintun/holding/blob/master/LICENSE
 */

'use strict';

// vars
var toString = Object.prototype.toString;
var defineProperty = Object.defineProperty;

/**
 * type
 *
 * @param {any} value
 * @returns
 */
function type(value) {
  return toString.call(value);
}

/**
 * holding
 *
 * @param n
 * @param fn
 * @param context
 * @returns {proxy}
 */
function holding(n, fn, context) {
  // format n
  if (type(n) !== '[object Number]' && !isFinite(n)) {
    throw new TypeError('The first arguments must be a finite number.');
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
    writable: true,
    value: function() {
      if (!called) {
        // set called
        called = true;

        // execute fn
        return fn.apply(context, arguments);
      }
    }
  });

  // proxy
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

  // return proxy function
  return proxy;
}

// exports
module.exports = holding;
