const { sequelize } = require("../../models/index");
const { Op } = require("sequelize");
const uuid = require("uuid");

/* -------------------------------------------------------------------------------------------------------------- */

const createWatchList = async (req, res) => {
  try {

    const { entity_type, entity_id, user_id, user_name , is_watched,createdBy_id,createdBy_name} = req.body;
    const findWatchList = await sequelize.models.WatchLists.findAll({
      where: {
        user_id:user_id,
        entity_type:entity_type,
        entity_id:entity_id,
        record_state: "latest",
      },
    });
    if(findWatchList.length===0)
    {
    const newWatchList = await sequelize.models.WatchLists.create({
      entity_type,
      entity_id,
      user_id,
      user_name,
      is_watched,
      createdBy_id,
      createdBy_name,
    });
       res.status(200).json({ watchList: newWatchList });
  }
  else
  {
    res.status(400).json({ message: "Already watched by selected user." });
  }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/* -------------------------------------------------------------------------------------------------------------- */

const getWatchListByUserAndType = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const  entity_type = req.params.entity_type;
    const watchList = await sequelize.models.WatchLists.findAll({
      where: {
        user_id:user_id,
        entity_type:entity_type,
        record_state: "latest",
      },
    });

    res.status(200).json({watchList:watchList});
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/* -------------------------------------------------------------------------------------------------------------- */

const checkWatchList = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const  entity_id = req.params.entity_id;
    const  entity_type = req.params.entity_type;

    const watchList = await sequelize.models.WatchLists.findAll({
      where: {
        user_id:user_id,
        entity_id:entity_id,
        entity_type:entity_type,
        record_state: "latest",
      },
    });
    if(watchList.length>0)
    {
      res.status(200).json({result:watchList[0].is_watched});

    }
    else
    {
      res.status(400).json({result:"false"});
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};


/* -------------------------------------------------------------------------------------------------------------- */

const getWatchListByEntityAndType = async (req, res) => {
  try {
    const entity_id = req.params.entity_id;
    const  entity_type = req.params.entity_type;
    const watchList = await sequelize.models.WatchLists.findAll({
      where: {
        entity_id:entity_id,
        entity_type:entity_type,
        record_state: "latest",
      },
    });

    res.status(200).json({watchList:watchList});
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
/* -------------------------------------------------------------------------------------------------------------- */

const deleteWatchList = async (req, res) => {
  const entity_id = req.params.entity_id;
  const user_id = req.params.user_id;
try {
  const deleted = await sequelize.models.WatchLists.update(
    {
      is_watched:false,
      record_state: "deleted",
    },
    {
      where: {
        entity_id: entity_id,
        user_id: user_id,
        record_state: "latest",

      },
    }
  );
  if(deleted[0]>0)
  {
    res.status(200).json({ message: "Deleted" });
  }
  else
  {
    res.status(400).json({ message: "Not Found" });
  }} catch (error) {
  res.status(400).json({ message: error });
}
};

module.exports = {
  createWatchList,
  getWatchListByUserAndType,
  getWatchListByEntityAndType,
  deleteWatchList,
  checkWatchList,
};
