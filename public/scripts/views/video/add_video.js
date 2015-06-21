define([
    'jquery',
    'underscore',
    'backbone',
    'api',
    'text!/templates/video/add_video.html'
], function($, _, Backbone, Api, t_addVideo) {

    var $content = $('#content');

    var AddVideo = Backbone.View.extend({

        className: 'container',

        template: _.template(t_addVideo),

        initialize: function () {
        },

        events: {
            'click #btn-addVideo': 'addVideo'
        },

        addVideo: function() {
            var idVideo = this.$('[name=url]').val().slice(32,44);
            var obj = new Image();
            obj.src = "https://i.ytimg.com/vi_webp/" + idVideo + "/mqdefault.webp";

            if (!obj.complete) {
                obj.src = "https://i.ytimg.com/vi/" + idVideo + "/mqdefault.jpg";
            }

            var data = {
                name: this.$('[name=name]').val(),
                description: this.$('[name=description]').val(),
                //url: this.$('[name=url]').val(),
                url: "http://www.youtube.com/embed/" + idVideo,
                img: obj.src
            };
            Api.createVideos(data)
                .then(Backbone.trigger.bind(Backbone, 'api:addVideo:successful'))
                .catch(Backbone.trigger.bind(Backbone, 'api:addVideo:error'))
        },

        render: function() {
            $content.empty();
            this.$el.html(this.template());
            this.delegateEvents();
            $content.append(this.$el);
            return this;
        }
    });

    return AddVideo;
});