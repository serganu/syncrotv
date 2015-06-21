module.exports = function (app) {

  var P = app.Promise;
  var db = app.db;

  var util = require('../util');
  var dao = require('../dao')(app);

  return {
    create: function (req, res) {
      util.checkParams(req.body, ['descripcio']);

      db.sequelize.transaction(function (t) {
        return dao.Usuari.getByEmail(req.user.username, t)
          .then(function (user) {
            if (!user) util.sendError(500, util.Error.ERR_ENTITY_NOT_FOUND, "User from token does not exist");
            else return dao.Sala.create(req.body, user, t);
          })
      })
        .then(util.jsonResponse.bind(util, res))
        .catch(util.resendError.bind(util, res))
        .done();
    },

    getByEmail: function (req, res) {
      if (!req.params.id) util.stdErr500(res, "Missing parameter 'UsuariEmail'");
      else
        dao.Sala.getByEmail(req.params.id, req.user.username)
            .then(util.jsonResponse.bind(util, res))
            .catch(util.resendError.bind(util, res))
            .done();
    },

    addVideo: function(req, res) {
        util.checkParams(req.body, ['VideoId']);
        dao.Sala.addVideo(req.body.VideoId, req.user.username)
          .then(util.jsonResponse.bind(util, res))
          .catch(util.resendError.bind(util, res))
          .done();
    }
  }
}
