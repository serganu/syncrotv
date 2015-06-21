define(['backbone'],
  function(Backbone){
    var VideoModel = Backbone.Model.extend({
      urlRoot: "/api/videos"
    });

    return VideoModel;
  });