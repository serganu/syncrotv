/**
 * Model de la Base de Dades - Usuari
 */

module.exports = function(sequelize, DataTypes) {

	var Usuari = sequelize.define('Usuari', {
		email : {
			type: DataTypes.STRING(255),
			primaryKey: true
		},
		password : DataTypes.STRING(100),
		nom: DataTypes.STRING(20),
		cognoms: DataTypes.STRING(60),
		connect: DataTypes.BOOLEAN()
	}, {
		classMethods : {
			associate : function(models) {
				Usuari.hasMany(models.Video),
				Usuari.belongsTo(models.Sala,{constraints: false}),
                Usuari.hasMany(models.Video)
			}
		}
	});

	return Usuari;
};