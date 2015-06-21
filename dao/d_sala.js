module.exports = function (app, dao) {
    var util = require('../util');
    var db = app.db;
    var P = app.Promise;
    var Sala = {};

    Sala.getByEmail = function (email, username, t) {
        return db.Sala.find(util.addTrans(t, { include: [ db.Video ], where: {UsuariEmail: email} }))
            .then(function(sala){
                if (!sala)  util.throwError(400, util.Error.ERR_ENTITY_NOT_FOUND, "User doesn't exist");
                else{
                return dao.Usuari.getByEmail(username,t)
                    .then(function(user){
                            user.setSala(sala, util.addTrans(t,{}));
                            return sala;
                    })
                }
        })
    }

    Sala.create = function (sala_data, user, t) {
        return db.Sala.create(sala_data, util.addTrans(t, {}))
            .then(function(sala) {
                return sala.setUsuari(user, util.addTrans(t, {}))
            });
    }

    Sala.addVideo = function (idvideo, username, t){
        return dao.Sala.getByEmail(username, username, t)
            .then(function(sala){
                return dao.Video.getById(idvideo, t)
                    .then(function(video){
                        return sala.setVideo(video, util.addTrans(t,{}))
                    })
            })
    }

    return Sala;
}