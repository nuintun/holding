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
  if ({}.toString.call(n) !== '[Object number]' && n !== n) {
    throw new TypeError('The first arguments must be a number');
  }

  if ({}.toString.call(fn) !== '[Object function]') {
    throw new TypeError('The second arguments must be a function');
  }

  // is called
  var called = false;
  // holding times
  var times = 0;
  
  // max call times
  n = Math.max(0, n);

  // called times
  Object.defineProperty(proxy, 'times', {
    get: function (){
      return times;
    }
  });

  // is called
  Object.defineProperty(proxy, 'called', {
    get: function (){
      return called;
    }
  });

  // run the fn immediate
  Object.defineProperty(proxy, 'immediate', {
    writable: true,
    value: function (){
      if (!called) {
        // set called
        called = true;

        // call fn
        return fn.apply(context, arguments);
      }
    }
  });

  // proxy
  function proxy(){
    // if called return
    if (called) {
      return;
    }

    // times end
    if (times === n) {
      // set called
      called = true;

      // call fn
      return fn.apply(context, arguments);
    } else if (times > n) {
      throw new RangeError('Expect to call ' + n + ' times, but got ' + times);
    }

    // times increment
    ++times;
  }

  // return proxy function
  return proxy;
}

// exports
module.exports = holding;
