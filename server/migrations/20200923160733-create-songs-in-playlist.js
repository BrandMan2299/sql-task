'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Songs_in_playlists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      songId: {
        type: Sequelize.INTEGER
      },
      playlistId: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      uploaded_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defualtValue: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Songs_in_playlists');
  }
};