'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Favorites', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      entity_type: {
        type: Sequelize.STRING
      },
      entity_id: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      },
      user_name: {
        type: Sequelize.STRING
      },
      is_liked: {
        type: Sequelize.BOOLEAN
      },
      record_state: {
        type: DataTypes.ENUM,
        values: ['latest', 'updated', 'deleted'],
        defaultValue: 'latest'
      },
      createdBy_id:
      {
        type:DataTypes.STRING,
      },
      createdBy_name:
      {
        type:DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Favorites');
  }
};