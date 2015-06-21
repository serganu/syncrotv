define([
  'jquery',
  'underscore',
  'backbone',
  'api',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!/templates/video/tl_video.html'
], function($, _, Backbone, Api, tl_video) {

  var $content = $('#content');

  var VideoListView = Backbone.View.extend({
    
    className: 'container',

    initialize: function () {
    },

      events: {
          'click .list-video': 'setVideoSala'
      },

    setVideoSala: function(ev) {
        var data = {
            VideoId: $(ev.currentTarget).data('id')
        }
        Api.setVideoSala(data)
            .then(Backbone.trigger.bind(Backbone, 'api:setVideoSala:successful'))
            .catch(Backbone.trigger.bind(Backbone, 'api:setVideoSala:error'))
    },

    render: function(videos) {
      $content.empty();
      this.$el.html(_.template(tl_video, {videos: videos}));
      this.delegateEvents();
      $content.append(this.$el);
      return this;
    }

  });

  return VideoListView;
});