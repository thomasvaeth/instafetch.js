(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory(root));
  } else if (typeof exports === 'object') {
    module.exports = factory(root);
  } else {
    root.instafetch = factory(root);
  }
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

  'use strict';

  var instafetch = {};
  var supports = !!document.querySelector && !!root.addEventListener;
  var settings;
  var baseUrl = 'https://api.instagram.com/v1/users/';

  var defaults = {
    userId: null,
    accessToken: null
  };

  var forEach = function (collection, callback, scope) {
    if (Object.prototype.toString.call(collection) === '[object Object]') {
      for (var prop in collection) {
        if (Object.prototype.hasOwnProperty.call(collection, prop)) callback.call(scope, collection[prop], prop, collection);
      }
    } else {
      for (var i = 0, len = collection.length; i < len; i++) {
        callback.call(scope, collection[i], i, collection);
      }
    }
  };

  var extend = function(defaults, options) {
    var extended = {};
    forEach(defaults, function (value, prop) {
      extended[prop] = defaults[prop];
    });
    forEach(options, function (value, prop) {
      extended[prop] = options[prop];
    });
    return extended;
  };

  instafetch.init = function(options) {
    if (!supports) return;

    settings = extend(defaults, options || {});
    console.log(settings);
  };

  return instafetch;
});
