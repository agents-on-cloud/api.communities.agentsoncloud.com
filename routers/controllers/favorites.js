const { sequelize } = require("../../models/index");
const { Op } = require("sequelize");
const uuid = require("uuid");

/* -------------------------------------------------------------------------------------------------------------- */

const createFavorite = async (req, res) => {
  try {
    
    const { entity_type, entity_id, user_id, user_name , is_liked,createdBy_id,createdBy_name} = req.body;
    const findFavorite = await sequelize.models.Favorites.findAll({
      where: {
        user_id:user_id,
        entity_type:entity_type,
        entity_id:entity_id,
        record_state: "latest",
      },
    });
    if(findFavorite.length===0)
    {
    const newFavorite = await sequelize.models.Favorites.create({
      entity_type,
      entity_id,
      user_id,
      user_name,
      is_liked,
      createdBy_id,
      createdBy_name,
    });
       res.status(200).json({ favorites: newFavorite });
  }
  else
  {
    res.status(400).json({ message: "Already liked by selected user." });
  }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/* -------------------------------------------------------------------------------------------------------------- */

const getFavoritesByUserAndType = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const  entity_type = req.params.entity_type;
    const favorites = await sequelize.models.Favorites.findAll({
      where: {
        user_id:user_id,
        entity_type:entity_type,
        record_state: "latest",
      },
    });

    res.status(200).json({favorites:favorites});
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/* -------------------------------------------------------------------------------------------------------------- */

const checkFavorite = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const  entity_id = req.params.entity_id;
    const  entity_type = req.params.entity_type;

    const favorites = await sequelize.models.Favorites.findAll({
      where: {
        user_id:user_id,
        entity_id:entity_id,
        entity_type:entity_type,
        record_state: "latest",
      },
    });
    if(favorites.length>0)
    {
      res.status(200).json({result:favorites[0].is_liked});

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

const getFavoritesByEntityAndType = async (req, res) => {
  try {
    const entity_id = req.params.entity_id;
    const  entity_type = req.params.entity_type;
    const favorites = await sequelize.models.Favorites.findAll({
      where: {
        entity_id:entity_id,
        entity_type:entity_type,
        record_state: "latest",
      },
    });

    res.status(200).json({favorites:favorites});
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
/* -------------------------------------------------------------------------------------------------------------- */

const deleteFavorite = async (req, res) => {
  const entity_id = req.params.entity_id;
  const user_id = req.params.user_id;
try {
  const deleted = await sequelize.models.Favorites.update(
    {
      is_liked:false,
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
  }
} catch (error) {
  res.status(400).json({ message: error });
}
};

module.exports = {
  createFavorite,
  getFavoritesByUserAndType,
  getFavoritesByEntityAndType,
  deleteFavorite,
  checkFavorite,
};
