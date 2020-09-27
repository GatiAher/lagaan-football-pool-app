const knex = require("../db");

exports.userAll = async (req, res) => {
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

exports.userAllOrderOfScore = async (req, res) => {
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

exports.userCreate = async (req, res) => {
  knex("User")
    .insert({ username: req.body.username, id: req.body.id })
    .then(() => {
      res.json({
        message: `User ${req.body.username} ${req.body.id} created.`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `There was an error creating user ${req.body.username} ${req.body.id}: ${err}`,
      });
    });
};

exports.userById = async (req, res) => {
  knex("User")
    .where("id", req.params.id)
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      res.status(500).json({
        message: `There was an error retrieving user ${req.body.id}: ${err}`,
      });
    });
};

exports.userUpdateById = async (req, res) => {
  knex("User")
    .where("id", req.params.id)
    .update(req.body)
    .then(() => {
      res.json({ message: `User ${req.params.id} updated.` });
    })
    .catch((err) => {
      res.status(500).json({
        message: `There was an error updating user ${req.params.id}: ${err}`,
      });
    });
};

exports.userDeleteById = async (req, res) => {
  knex("User")
    .where("id", req.body.id)
    .del()
    .then(() => {
      res.json({ message: `User ${req.body.id} deleted.` });
    })
    .catch((err) => {
      res.status(500).json({
        message: `There was an error deleting user ${req.body.id}: ${err}`,
      });
    });
};
