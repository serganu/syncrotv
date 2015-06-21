define([
  'backbone',
  'ui'
], function (Backbone, Ui) {

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'home',
        'signup': 'signup',
        'videos': 'showVideos',
        'sala/:id': 'showSalaId',
        'sala': 'showSala',
        'afegir': 'showAddVideo',
        '*actions': 'defaultAction'
    },

    home: function() {
      Ui.showHome();
    },

    signup: function() {
      Ui.showSignup();
    },

    showVideos: function() {
      Ui.showVideos();
    },

    showSala: function() {
      var id = Backbone.localStorage.getItem('user');
      Ui.showSalaId(id.username);
    },

    showSalaId: function(id){
        Ui.showSalaId(id)
    },

    showAddVideo: function() {
      Ui.showAddVideo();
    }
  });

  var app = new AppRouter();

  Backbone.history.start();

  Backbone.on('api:signup:successful', function (user) {
    app.navigate('', { trigger: true });
  });

  Backbone.on('api:login:successful', function (user) {
    Backbone.localStorage.setItem('user', user);
    app.navigate('videos', { trigger: true });
  });

  Backbone.on('api:addVideo:successful', function () {
    app.navigate('videos', { trigger: true });
  });

  Backbone.on('api:setVideoSala:successful', function () {
    app.navigate('sala', { trigger: true });
  });

  return app;

});