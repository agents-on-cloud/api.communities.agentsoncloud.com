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
    const response = [];
    const obj = {};
    for (let i = 0; i < tags.length; i++) {
      if (!obj[tags[i].dataValues.name]) {
        response.push(tags[i].dataValues);
        obj[tags[i].dataValues.name] = true;
      }
    }
    res.status(200).json(response);
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
      uuid: Genuuid,
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

const getTagsByIdAndType = async (req, res) => {
  try {
    const { id, type } = req.params;
    const tags = await sequelize.models.Tags.findAll({
      where: {
        status: "latest",
        type,
        link_to: id,
      },
    });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json("error");
  }
};

const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tags = await sequelize.models.Tags.update(
      {
        status: "deleted",
      },
      {
        where: {
          uuid: id,
        },
      }
    );
    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json("error");
  }
};

module.exports = {
  getAllTags,
  addTag,
  getTagsByIdAndType,
  deleteTag,
};
