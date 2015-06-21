/**
 * New node file
 */

module.exports = function (app) {
  var dao = {};

  dao.Usuari = require('./d_usuari')(app, dao);
  dao.Sala = require('./d_sala')(app, dao);
  dao.Video = require('./d_video')(app, dao);


    return dao;
}