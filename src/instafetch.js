(function(root, factory) {
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
  var settings, url, json;
  var baseUrl = 'https://api.instagram.com/v1/users/';

  var defaults = {
    userId: null,
    accessToken: null,
    numOfPics: 20,
    caption: false
  };

  var forEach = function(collection, callback, scope) {
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
    forEach(defaults, function(value, prop) {
      extended[prop] = defaults[prop];
    });
    forEach(options, function(value, prop) {
      extended[prop] = options[prop];
    });
    return extended;
  };

  var fetchFeed = function(options) {
    if (options.userId !== null && options.accessToken !== null) { 

      if (options.userId === options.accessToken.split('.')[0]) {
        var url = baseUrl + options.userId + '/media/recent/?access_token=' + options.accessToken + '&count=' + options.numOfPics + '&callback=?';
        
        fetchJsonp(url).then(function(response) {
          return response.json();
        }).then(function(json) {
          displayFeed(json);
        }).catch(function(error) {
          console.log(error);
        });
      } else {
        console.log('Access Token is invalid for User ID');
      }

    } else {
      console.log('User ID and Access Token are required.');
    }
  };

  var displayFeed = function(json) {
    json.data.forEach(function(data) {

      if (data.type === 'image') {
        console.log(data);
      } else if (data.type === 'video') {
        console.log(data);
      }

    });
  };

  instafetch.destroy = function() {
    if (!settings) return;

    settings = null;
    url = null;
    json = null;
  };

  instafetch.init = function(options) {
    if (!supports) return;

    instafetch.destroy();

    settings = extend(defaults, options || {});
    
    fetchFeed(settings);
  };

  return instafetch;
});
