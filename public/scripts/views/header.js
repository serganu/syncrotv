define([
  'underscore',
  'backbone',
  'api',
  'text!/templates/header.html'
], function(_, Backbone, Api, t_header) {

  var userData = {};

  var Header = Backbone.View.extend({

    initialize: function () {
      this.listenTo(Backbone, 'api:login:successful', this.setUserData.bind(this));
    },

    events: {
      'click #btn-remsala': 'goSala'
    },
     goSala: function() {
      var data = this.$('[name=remsala]').val()
      window.location='#sala/'+data;
    },

    render: function() {
      this.$el.html(_.template(t_header, {user: userData}));
      return this;
    },

    setUserData: function(user) {
      userData = user;
      this.render();
    }

  });

  return Header;
});