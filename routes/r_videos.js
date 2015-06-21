module.exports = function (app) {

  var P = app.Promise;
  var db = app.db;

  var util = require('../util');
  var dao = require('../dao')(app);

  return {
    create: function (req, res) {
      util.checkParams(req.body, ['description']);

      db.sequelize.transaction(function (t) {
        return dao.Usuari.getByEmail(req.user.username, t)
          .then(function (user) {
            if (!user) util.sendError(500, util.Error.ERR_ENTITY_NOT_FOUND, "User from token does not exist");
            else return dao.Video.create(req.body, user, t);
          })
      })
        .then(util.jsonResponse.bind(util, res))
        .catch(util.resendError.bind(util, res))
        .done();
    },

    getById: function (req, res) {
      if (!req.params.id) util.stdErr500(res, "Missing parameter 'id'");
      else
        dao.Video.getById(req.params.id)
            .then(util.jsonResponse.bind(util, res))
            .catch(util.resendError.bind(util, res))
            .done();
    },

    getVideos: function (req, res) {
      dao.Video.getUserVideos(req.user.username, {})
        .then(util.jsonResponse.bind(util, res))
        .catch(util.resendError.bind(util, res))
        .done();
    }
  }
}
