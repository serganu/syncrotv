require.config({
  paths: {
    jquery: 'libs/jquery-1.11.0.min',
    "jquery.bootstrap": "libs/bootstrap.min",
    "jquery.validate": "libs/jquery.validate.min",
    underscore: 'libs/underscore-min',
    backbone: 'libs/backbone-min',
    promises: 'libs/bluebird.min',
    text: 'libs/text',
    socketio: '/socket.io/socket.io.js'
  }
});

require([
  'promises',
  'app'
], function (P, App) {

  P.defer = function () {
    var resolve, reject;
    var promise = new P(function () {
      resolve = arguments[0];
      reject = arguments[1];
    });
    return {
      resolve: resolve,
      reject: reject,
      promise: promise
    };
  }

  Backbone.localStorage = {};
  Backbone.localStorage.setItem = function (key, obj) {
    window.localStorage.setItem(key, JSON.stringify(obj));
  }
  Backbone.localStorage.getItem = function (key) {
    var str = window.localStorage.getItem(key);
    if (str) {
      return JSON.parse(str);
    }
  }

  window.localStorage.removeItem('user');

  var backboneSync = Backbone.sync;
  Backbone.sync = function (method, model, options) {
    var user = Backbone.localStorage.getItem('user');
    var token = user && user.jwt;

    if (token) {
      options.headers = {
        'Authorization': 'Bearer ' + token
      }
    }

    backboneSync(method, model, options);
  };


    App.initialize();
});

