import fetchJsonp from 'fetch-jsonp';

const Instafetch = (function() {
  let s;

  return {
    settings: {
      url: 'https://api.instagram.com/v1/users/',
      defaults: {
        userId: null,
        accessToken: null
      }
    },

    init: function() {
      s = this.settings;
      this.fetchFeed(s.defaults);
    },

    fetchFeed: function(obj) {
      if (obj.userId != undefined && obj.accessToken != undefined) {
        var url = s.url + obj.userId + '/media/recent/?access_token=' + obj.accessToken + '&callback=?';

        fetchJsonp(url).then(res => {
          return res.json();
        }).then(data => {
          console.log(data);
        }).catch(() => {
          console.log('Error');
        });
      } else {
        console.log('User ID and Access Token are required for the Instagram API.');
      }
    }
  }
})();

document.addEventListener('DOMContentLoaded', function() {
  Instafetch.init();
});
