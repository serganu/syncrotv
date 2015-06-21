define([
    'backbone',
    'models/m_video'
], function(Backbone, VideoModel){
    var VideoCollection = Backbone.Collection.extend({
        model: VideoModel,
        url: "/api/users/self/videos"
    });

    return VideoCollection;
});