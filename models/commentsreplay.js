"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CommentsReplay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CommentsReplay.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      replay_id: DataTypes.STRING,
      user_id: DataTypes.STRING,
      user_name: DataTypes.STRING,
      comment: DataTypes.STRING,
      comment_id: DataTypes.STRING,
      user_image: DataTypes.STRING,
      is_deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "CommentsReplay",
    }
  );
  return CommentsReplay;
};
