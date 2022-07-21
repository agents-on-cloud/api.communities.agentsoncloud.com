"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comments.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      comment_id: DataTypes.STRING,
      type: DataTypes.STRING,
      task_id: DataTypes.STRING,
      user_id: DataTypes.STRING,
      user_name: DataTypes.STRING,
      comment: DataTypes.STRING,
      user_image: DataTypes.STRING,
      is_old_record: DataTypes.BOOLEAN,
      is_deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  return Comments;
};
