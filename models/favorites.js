"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Favorites.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      entity_type: DataTypes.STRING,
      entity_id: DataTypes.STRING,
      user_id: DataTypes.STRING,
      user_name: DataTypes.STRING,
      is_liked: DataTypes.BOOLEAN,
      record_state: {
        type: DataTypes.ENUM,
        values: ['latest', 'updated', 'deleted'],
        defaultValue: 'latest'
      },
      createdBy_id:DataTypes.STRING,
      createdBy_name:DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Favorites",
    }
  );
  return Favorites;
};
