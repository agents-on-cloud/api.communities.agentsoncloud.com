const { sequelize } = require("../../models/index");
const { Op } = require("sequelize");
const uuid = require("uuid");

/* -------------------------------------------------------------------------------------------------------------- */

const crateComment = async (req, res) => {
  try {
    const { task_id, user_id, user_name, comment, type, user_image } = req.body;
    const comment_id = uuid.v4();
    const newComment = await sequelize.models.Comments.create({
      comment_id,
      task_id,
      user_id,
      user_name,
      comment,
      type,
      user_image,
      is_old_record: false,
      is_deleted: false,
    });
    // let work_status = "added comment";
    // const task = await sequelize.models.Tasks.findAll({
    //   where: { task_id: task_id },
    // });
    // const oldTask = task[task.length - 1];

    // await sequelize.models.Tasks.update(
    //   {
    //     is_old_record: true,
    //   },
    //   {
    //     where: {
    //       task_id: task_id,
    //     },
    //   }
    // );

    // const newTaskc = await sequelize.models.Tasks.create({
    //   task_id: oldTask.task_id,
    //   creator: oldTask.creator,
    //   creator_name: oldTask.creator_name,
    //   subject: oldTask.subject,
    //   description: oldTask.description,
    //   status: oldTask.status,
    //   claimed: oldTask.claimed,
    //   priority: oldTask.priority,
    //   created_date: oldTask.created_date,
    //   created_time: oldTask.created_time,
    //   due_date: oldTask.due_date,
    //   due_time: oldTask.due_time,
    //   estimated_time: oldTask.estimated_time,
    //   work_status: work_status,
    //   attachment: oldTask.attachment,
    //   is_old_record: false,
    //   is_deleted: false,
    // });
    res.status(201).json({ comment: newComment, replays: [] });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/* -------------------------------------------------------------------------------------------------------------- */

const getTaskCooments = async (req, res) => {
  try {
    const task_id = req.params.id;
    const type = req.params.type;
    const comments = await sequelize.models.Comments.findAll({
      where: {
        task_id,
        type,
        is_old_record: false,
        is_deleted: false,
      },
    });

    const response = [];

    for (let i = 0; i < comments.length; i++) {
      console.log(i, "comment");
      const replays = await sequelize.models.CommentsReplay.findAll({
        where: {
          comment_id: comments[i].comment_id,
          is_deleted: false,
        },
      });
      console.log(replays.length, "replays");
      response.push({ comment: comments[i], replays: replays });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/* -------------------------------------------------------------------------------------------------------------- */

const deleteComment = async (req, res) => {
  const comment_id = req.params.id;
  console.log(comment_id);
  const dele = await sequelize.models.Comments.update(
    {
      is_deleted: true,
    },
    {
      where: {
        comment_id: comment_id,
      },
    }
  );
  console.log(dele);
  res.status(200).json({ ms: "done" });
};

/* -------------------------------------------------------------------------------------------------------------- */

const updateComment = async (req, res) => {
  try {
    const comment_id = req.params.id;
    const newComment = req.body.newComment;
    const response = await sequelize.models.Comments.update(
      {
        comment: newComment,
      },
      {
        where: {
          comment_id: comment_id,
        },
      }
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/* -------------------------------------------------------------------------------------------------------------- */

const addReplay = async (req, res) => {
  try {
    const { comment_id, user_id, user_name, comment, user_image } = req.body;
    const replay_id = uuid.v4();
    const response = await sequelize.models.CommentsReplay.create({
      replay_id,
      user_id,
      user_name,
      comment,
      comment_id,
      user_image,
      is_deleted: false,
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/* -------------------------------------------------------------------------------------------------------------- */

const getAllReplay = async (req, res) => {
  const comment_id = req.params.id;
  const replays = await sequelize.models.CommentsReplay.findAll({
    where: {
      comment_id,
    },
  });
  res.status(200).json(replays);
};

/* -------------------------------------------------------------------------------------------------------------- */

const deleteReplay = async (req, res) => {
  try {
    const replay_id = req.params.id;
    await sequelize.models.CommentsReplay.update(
      {
        is_deleted: true,
      },
      {
        where: {
          replay_id,
        },
      }
    );

    res.status(200).json("deleted");
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/* -------------------------------------------------------------------------------------------------------------- */

const updateReplay = async (req, res) => {
  try {
    const replay_id = req.params.id;
    console.log(replay_id);
    const newComment = req.body.newComment;
    const response = await sequelize.models.CommentsReplay.update(
      {
        comment: newComment,
      },
      {
        where: {
          replay_id: replay_id,
        },
      }
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/* -------------------------------------------------------------------------------------------------------------- */

module.exports = {
  crateComment,
  getTaskCooments,
  deleteComment,
  addReplay,
  getAllReplay,
  deleteReplay,
  updateComment,
  updateReplay,
};
