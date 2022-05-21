const { sequelize } = require("../../models/index");
const { Op } = require("sequelize");
const uuid = require("uuid");

const getAllTags = async (req, res) => {
  try {
    const tags = await sequelize.models.Tags.findAll({
      where: {
        status: "latest",
      },
    });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json("error");
  }
};

const addTag = async (req, res) => {
  try {
    const { name, type, link_to } = req.body;
    const Genuuid = uuid.v4();
    const status = "latest";
    const newTag = await sequelize.models.Tags.create({
      uuid : Genuuid,
      name,
      type,
      link_to,
      status,
    });
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAllTags,
  addTag,
};
