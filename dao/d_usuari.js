module.exports = function (app) {
    var db = app.db;
    var Usuari = {};

    var util = require('../util');
    var bcrypt = require('bcrypt-nodejs');

    Usuari.checkPassword = function (email, password, t) {
        return Usuari.getByEmail(email, t)
            .then(function (user) {
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        return user;
                    } else {
                        util.throwError(400, util.Error.ERR_AUTHENTICATION, "Invalid password");
                    }
                } else {
                    util.throwError(400, util.Error.ERR_ENTITY_NOT_FOUND, "There is no User with Email: " + email);
                }
            });
    };

    Usuari.getByEmail = function (email, t) {
        return db.Usuari.find(util.addTrans(t, {where: {email: email}}));
    }

    Usuari.create = function (user_data, t) {
        return db.Usuari.create(user_data, util.addTrans(t, {}))
    }

    return Usuari;
}