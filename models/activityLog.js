"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ActivityLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ActivityLog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      entity_type: DataTypes.STRING,
      entity_id: DataTypes.STRING,
      entity_name: DataTypes.STRING,
      user_id: DataTypes.STRING,
      user_name: DataTypes.STRING,
      activity_description: DataTypes.BOOLEAN,
      record_state: {
        type: DataTypes.ENUM,
        values: ['LATEST', 'UPDATED', 'DELETED'],
        defaultValue: 'LATEST'
      },
      createdBy_id:DataTypes.STRING,
      createdBy_name:DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "ActivityLog",
    }
  );
  return ActivityLog;
};
