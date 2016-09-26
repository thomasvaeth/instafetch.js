# Instafetch.js
Instafetch.js is a 3KB JavaScript plugin for the Instagram API using fetch instead of jQuery.

## Installation
Instafetch.js is only available on GitHub. Download the script or the minified version in the ````dist```` folder.

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

## Issues
The Fetch API is not supported on Internet Explorer yet. Please submit any other issues [here](https://github.com/thomasvaeth/instafetch.js/issues).

## License
Instafetch.js is licensed under the MIT License.
