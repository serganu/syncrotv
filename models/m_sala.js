/**
 * Model de la Base de Dades - Sala
 */

module.exports = function(sequelize, DataTypes) {

	var Sala = sequelize.define('Sala', {
		descripcio: DataTypes.STRING(200)
	}, {
		classMethods : {
			associate : function(models) {
				Sala.belongsTo(models.Video),
				Sala.belongsTo(models.Usuari,{foreginKey: 'email'})
			}
		}
	});

	return Sala;
};