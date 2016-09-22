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
    accessToken: null,
    numOfPics: 20
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

  instafetch.fetchFeed = function(defaults) {
    if (settings.userId !== null && settings.accessToken !== null) {
      var url = baseUrl + settings.userId + '/media/recent/?access_token=' + settings.accessToken + '&count=' + settings.numOfPics + '&callback=?';

      fetchJsonp(url).then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json);
      }).catch(function(error) {
        console.log(error);
      });
    } else {
      console.log('User ID and Access Token are required.')
    }
  }

  instafetch.init = function(options) {
    if (!supports) return;

    settings = extend(defaults, options || {});

    instafetch.fetchFeed();
  };

  return instafetch;
});
