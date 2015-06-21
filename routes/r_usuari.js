 /**
 * Created by Raul on 26/04/2015.
 */


module.exports = function (app) {

    var db = app.db;
    var secret = app.secret;
    var P = app.Promise;

    var util = require('../util');
    var dao = require('../dao')(app);
    var bcrypt = require('bcrypt-nodejs');
    var jwt = require('jsonwebtoken');

    return {
        login: function (req, res) {
            util.checkParams(req.body, ['email', 'password']);

            dao.Usuari.checkPassword(req.body.email, req.body.password)
                .then(function (user) {
                    var token = jwt.sign({username: user.email}, secret);
                    util.jsonResponse(res, {jwt: token, username: user.email});
                })
                .catch(util.resendError.bind(util, res))
                .done();
        },

        create: function (req, res) {
            util.checkParams(req.body, ['email', 'password']);

            var attribs = {
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password),
                nom: req.body.nom,
                cognoms: req.body.cognoms
            }

            db.sequelize.transaction(function (t) {
                return P.all([
                    dao.Usuari.getByEmail(req.body.email, t)
                ])
                .spread(function (user) {
                        if (user)  util.throwError(400, util.Error.ERR_ENTITY_NOT_FOUND, "Already exist a User with email = " + req.body.email);
                        else{
                            return dao.Usuari.create(attribs, t)
                                .then(function(user){
                                    var description = {
                                        descripcio: "Sala de "+req.body.email
                                    }
                                    dao.Sala.create(description,user,t)
                                });
                        }
                })
            }).then(util.jsonResponse.bind(util, res))
                .catch(util.resendError.bind(util, res))
                .done();
        },

        entrarSala: function(req,res){
            
        }

    }
}
