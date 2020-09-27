'use strict';
const { Model } = require('sequelize');
const playlist = require('./playlist');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Artist, {
        foreignKey: 'artistId'
      });
      this.belongsTo(models.Album, {
        foreignKey: 'albumId'
      });
      this.belongsToMany(models.Playlist, {
        through: models.Songs_in_playlist,
        foreignKey: 'songId'
      });
      this.belongsToMany(models.User, {
        through: models.Song_interactions,
        foreignKey: 'userId'
      })
    }
  };
  Song.init({
    name: DataTypes.STRING,
    albumId: DataTypes.INTEGER,
    artistId: DataTypes.INTEGER,
    youtubeLink: DataTypes.STRING,
    playCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};