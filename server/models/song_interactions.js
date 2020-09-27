'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song_interactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Song_interactions.init({
    songId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    playCount: DataTypes.INTEGER,
    isLiked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Song_interactions',
  });
  return Song_interactions;
};