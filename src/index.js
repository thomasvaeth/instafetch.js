'use strict';

var fetchJsonp = require('fetch-jsonp');

//
// Variables
//

var instafetch = {};
var supports = !!document.querySelector && !!document.addEventListener;
var settings, checked, url, targetEl, article, a, figure, img, div, p;
var baseUrl = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=';

// Default settings
var defaults = {
  accessToken: null,
  target: 'instafetch',
  numOfPics: 20,
  caption: false
};

//
// Methods
//

/**
 * A simple forEach() implementation for Arrays, Objects and NodeLists
 * @private
 * @param {Array|Object|NodeList} collection Collection of items to iterate
 * @param {Function} callback Callback function for each iteration
 * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
 */
var forEach = function(collection, callback, scope) {
  if (Object.prototype.toString.call(collection) === '[object Object]') {
    for (var prop in collection) {
      if (Object.prototype.hasOwnProperty.call(collection, prop)) {
        callback.call(scope, collection[prop], prop, collection);
      }
    }
  } else {
    for (var i = 0, len = collection.length; i < len; i++) {
      callback.call(scope, collection[i], i, collection);
    }
  }
};

/**
 * Merge defaults with user options
 * @private
 * @param {Object} defaults Default settings
 * @param {Object} options User options
 * @returns {Object} Merged values of defaults and options
 */
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

/**
 * Check typeof of settings
 * @private
 * @param {Object} options Merged values of defaults and options
 * @returns {Boolean} Return false if incorrect
 */
var checkSettings = function(options) {
  if (typeof options.accessToken !== 'string') {
    console.log('accessToken must be a string.');
    return false;
  }
  if (typeof options.target !== 'string') {
    console.log('target must be a string.');
    return false;
  }
  if (typeof options.numOfPics !== 'number') {
    console.log('numOfPics must be a number.');
    return false;
  }
  if (typeof options.caption !== 'boolean') {
    console.log('caption must be a boolean.');
    return false;
  }

  return true;
};

/**
 * Fetch Instagram API with settings
 * @private
 * @param {Object} options Merged values of defaults and options
 * @returns {Object} JSON data
 */
var fetchFeed = function(options) {
  url = baseUrl + options.accessToken + '&count=' + options.numOfPics + '&callback=?';

  fetchJsonp(url).then(function(response) {
    return response.json();
  }).then(function(json) {
    if (json.meta.code === 200) {
      displayFeed(json, options);
    } else {
      console.log(json.meta.error_message);
    }
  }).catch(function(error) {
    console.log(error);
  });
};

/**
 * Display JSON data from fetch
 * @private
 * @param {Object} json JSON data
 * @returns Stop if no element, display if element
 */
var displayFeed = function(json, options) {
  targetEl = document.getElementById(options.target);
  if (!targetEl) {
    console.log('No element with id="' + options.target + '" was found on the page.');
    return;
  }

  json.data.forEach(function(data) {
    article = document.createElement('article');
    a = document.createElement('a');
    a.href = data.link;
    a.target = '_blank';
    figure = document.createElement('figure');
    img = document.createElement('img');
    img.src = data.images.standard_resolution.url;
    figure.appendChild(img);
    a.appendChild(figure);
    article.appendChild(a);

    if (options.caption) {
      div = document.createElement('div');
      p = document.createElement('p');
      p.innerHTML = data.caption.text;
      div.appendChild(p);
      a.appendChild(div);
    }

    targetEl.appendChild(article);
  });
};

/**
 * Destroy the current initialization
 * @public
 */
instafetch.destroy = function() {
  // If plugin isn't already initialized, stop
  if (!settings) {
    return;
  }

  // Reset varaibles
  settings = null;
  checked = null;
  url = null;
  targetEl = null;
  article = null;
  a = null;
  figure = null;
  img = null;
  div = null;
  p = null;
};

/**
 * Initialize Instafetch
 * @public
 * @param {Object} options User settings
 */
instafetch.init = function(options) {
  // Feature test
  if (!supports) {
    return;
  }

  // Destroy any existing initializations
  instafetch.destroy();

  // Variables
  settings = extend(defaults, options || {});

  // Do something...
  checked = checkSettings(settings);

  if (checked) {
    fetchFeed(settings);
  }
};

//
// Public APIs
//

window.instafetch = instafetch;
