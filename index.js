/*!
 * holding
 * Date: 2016/7/4
 * https://github.com/Nuintun/file-send
 *
 * This is licensed under the MIT License (MIT).
 * For details, see: https://github.com/Nuintun/holding/blob/master/LICENSE
 */

'use strict';

/**
 * holding
 * @param n
 * @param fn
 * @param context
 * @returns {proxy}
 */
function holding(n, fn, context){
  // format n
  if ({}.toString.call(n) !== '[object Number]' && n !== n) {
    throw new TypeError('The first arguments must be a number.');
  }

  // format fn
  if ({}.toString.call(fn) !== '[object Function]') {
    throw new TypeError('The second arguments must be a function.');
  }

  // already holding times
  var times = 0;
  // is executed
  var executed = false;

  // max call times
  n = Math.max(0, n);

  // executed times
  Object.defineProperty(proxy, 'times', {
    get: function (){
      return times;
    }
  });

  // is executed
  Object.defineProperty(proxy, 'executed', {
    get: function (){
      return executed;
    }
  });

  // run the fn immediate
  Object.defineProperty(proxy, 'immediate', {
    writable: true,
    value: function (){
      if (!executed) {
        // set executed
        executed = true;

        // call fn
        return fn.apply(context, arguments);
      }
    }
  });

  // proxy
  function proxy(){
    // times end
    if (!executed && times === n) {
      // set executed
      executed = true;

      // call fn
      fn.apply(context, arguments);
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
