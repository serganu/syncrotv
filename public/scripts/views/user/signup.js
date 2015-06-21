define([
  'jquery',
  "jquery.validate",
  'underscore',
  'backbone',
  'api',
  'text!/templates/user/signup.html'
], function($, validate, _, Backbone, Api, t_signup) {

  var $content = $('#content');

  var UserSignup = Backbone.View.extend({

    className: 'container',

    template: _.template(t_signup),

    initialize: function () {
    },

    events: {
      'click #btn-signup': 'submit'
    },

    submit: function() {
        $("#signupform").validate({
            // Specify the validation rules
            rules: {
                email: {
                    required: true,
                    email: true
                },
                passwd: {
                    required: true,
                    minlength: 5
                },
                passwd2: {
                    equalTo: "#passwd"
                },
                name: {
                    required: true
                },
                surname: {
                    required: true
                }

            },

            // Specify the validation error messages
            messages: {
                passwd: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long"
                },
                email: "Please enter a valid email address",
                passwd2: "Please enter the same password as above",
                name: "Please provide a name",
                surname: "Please provide a surname"
            }

        });
        if ($('#signupform').valid()){
            var data = {
                email: this.$('[name=email]').val(),
                password: this.$('[name=passwd]').val(),
                nom: this.$('[name=name]').val(),
                cognoms: this.$('[name=surname]').val()
            };
            Api.signup(data)
                .then(Backbone.trigger.bind(Backbone, 'api:signup:successful'))
                .catch(Backbone.trigger.bind(Backbone, 'api:signup:error'))
            }
    },

    render: function() {
      $content.empty();
      this.$el.html(this.template());
      this.delegateEvents();
      $content.append(this.$el);
      return this;
    }
  });

  return UserSignup;
});