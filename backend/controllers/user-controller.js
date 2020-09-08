const knex = require("../db");

exports.userGetAll = async (req, res) => {
  knex
    .select("*")
    .from("User")
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `There was an error retrieving users: ${err}` });
    });
};

exports.userCreate = async (req, res) => {
  knex("User")
    .insert({ username: req.body.username, user_id: req.body.user_id })
    .then(() => {
      res.json({
        message: `User ${req.body.username} ${req.body.user_id} created.`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `There was an error creating user ${req.body.username} ${req.body.user_id}: ${err}`,
      });
    });
};

exports.userGetInOrderOfScore = async (req, res) => {
  knex("User")
    .orderBy("score", "desc")
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `There was an error retrieving users: ${err}` });
    });
};

exports.userGetByUserId = async (req, res) => {
  knex("User")
    .where("user_id", req.params.user_id)
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      res.status(500).json({
        message: `There was an error retrieving user ${req.body.user_id}: ${err}`,
      });
    });
};

exports.userUpdateByUserId = async (req, res) => {
  knex("User")
    .where("user_id", req.params.user_id)
    .update(req.body)
    .then(() => {
      res.json({ message: `User ${req.params.user_id} updated.` });
    })
    .catch((err) => {
      res.status(500).json({
        message: `There was an error updating user ${req.params.user_id}: ${err}`,
      });
    });
};

exports.userUpdateScore = async (req, res) => {
  // TODO
  res.json({ message: `Not implemented` });
};

exports.userUpdateRanking = async (req, res) => {
  // TODO
  res.json({ message: `Not implemented` });
};

exports.userDeleteByUserId = async (req, res) => {
  knex("User")
    .where("user_id", req.body.user_id)
    .del()
    .then(() => {
      res.json({ message: `User ${req.body.user_id} deleted.` });
    })
    .catch((err) => {
      res.status(500).json({
        message: `There was an error deleting user ${req.body.user_id}: ${err}`,
      });
    });
};

exports.userDeleteAll = async (req, res) => {
  knex("User")
    .truncate() // remove the selection
    .then(() => {
      res.json({ message: "User list cleared." });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `There was an error resetting User list: ${err}.` });
    });
};
