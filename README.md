# Instafetch.js
Instafetch.js is a 10KB JavaScript plugin for the Instagram API using fetch instead of jQuery.

## Installation
Instafetch.js is available on NPM, Bower, and GitHub. 

### NPM
```
npm install --save instafetch.js es6-promise
```

```javascript
require('es6-promise').polyfill();
require('instafetch.js');
```

### Bower
```
bower install instafetch.js
```

```html
<script type="text/javascript" src="path/to/bower_components/instafetch.js/dist/instafetch.min.js"></script>
```

### GitHub
Download the script or the minified version in the ````dist```` folder.

```html
<script type="text/javascript" src="path/to/instafetch.min.js"></script>
```

## Usage
The Instagram API uses the OAuth 2.0 protocol, so you're going to need an access token. The easiest way to get your access token is login to Instagram on your browser and generate one on [Pixel Union](http://instagram.pixelunion.net/).

```html
<script type="text/javascript">
  instafetch.init({
    accessToken: 'ACCESS TOKEN',
    target: 'instafetch',
    numOfPics: 20,
    caption: false
  });
</script>
```

Instafetch.js will look for an element with the ID of instafetch by default. The target element can be changed when initializing the plugin.

The plugin also allows you to set the number of items to return from your feed and if you want to include the captions.

## ES6 Promise Polyfill
Instafetch.js was only 3KB initially, but those 3KB didn't support any version of Internet Explorer. IE will return "Promise is undefined" and the Instagram feed will be empty. That's where the ES6 Promise polyfill comes in. That extra 7KB is just for IE.

## Changelog
**1.2.2**
* Fixed installation instructions for NPM

**1.2.1**
* Published different paths on NPM and Bower

**1.2**
* Added Browserify
* Added [ES6-Promise polyfill](https://github.com/stefanpenner/es6-promise) for Internet Explorer support ([Brian Hague](https://github.com/bhague1281))

**1.1**
* Changed Instagram API endpoint
* Removed user ID

**1.0**
* Initial release

## Issues
Please submit any issues [here](https://github.com/thomasvaeth/instafetch.js/issues).

## License
Instafetch.js is licensed under the MIT License.
