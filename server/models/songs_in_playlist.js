'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Songs_in_playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Songs_in_playlist.init({
    songId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Songs_in_playlist'
  });
  return Songs_in_playlist;
};