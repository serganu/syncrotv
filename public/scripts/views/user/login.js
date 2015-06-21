define([
  'jquery',
  'underscore',
  'backbone',
  'api',
  'text!/templates/user/login.html'
], function($, _, Backbone, Api, t_login) {

  var $content = $('#content');

  var UserLogin = Backbone.View.extend({

    template: _.template(t_login),

    className: 'container',

    initialize: function () {
    },

    events: {
      'click #btn-login': 'submit'
    },

    submit: function() {
     var data = {email: this.$('#login-username').val(), password: this.$('#login-password').val()};
      Api.login(data)
        .then(Backbone.trigger.bind(Backbone, 'api:login:successful'))
        .catch(Backbone.trigger.bind(Backbone, 'api:login:error'))
    },

    render: function() {
      $content.empty();
      this.$el.html(this.template());
      this.delegateEvents();
      $content.append(this.$el);
      return this;
    }

  });

  return UserLogin;
});