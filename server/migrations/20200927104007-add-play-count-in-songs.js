'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'songs', // table name
      'play_count', // new field name
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('songs', 'play_count')
  }
};
