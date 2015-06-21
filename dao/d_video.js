/**
 * New node file
 */

module.exports = function (app, dao) {
  var util = require('../util');
  var db = app.db;
  var P = app.Promise;
  var Video = {};

  Video.getById = function (id, t) {
    return db.Video.find(util.addTrans(t, {where: {id: id}}));
  }

  Video.getUserVideos = function (username, options, t) {
    var opt = options || {};
    return dao.Usuari.getByEmail(username, t)
      .then(function(user) {
        if (!user) util.throwError(200, util.Error.ERR_ENTITY_NOT_FOUND, 'There is no User with username: ' + username);
        return user.getVideos(util.addTrans(t, opt));
      })
  }

  Video.create = function (video_data, user, t) {
    return db.Video.create(video_data, util.addTrans(t, {}))
      .then(function(video) {
          return video.setUsuari(user, util.addTrans(t, {}))
        });
  }

  return Video;
}