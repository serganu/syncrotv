/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {
	var Video = sequelize.define('Video', {
        name: DataTypes.STRING(40),
		description : DataTypes.STRING(1024),
        url: DataTypes.STRING(2048),
        img: DataTypes.STRING(2048),
		pending: DataTypes.INTEGER
	}, {
		classMethods : {
			associate : function(models) {
				Video.belongsTo(models.Usuari)
			}
		}
	});

	return Video;
};