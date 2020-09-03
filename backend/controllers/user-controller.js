const knex = require("../db");

exports.userGetAll = async (req, res) => {
  knex
    .select("*")
    .from("User")
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      res.json({ message: `There was an error retrieving games: ${err}` });
    });
};

exports.userCreate = async (req, res) => {
  knex("User")
    .insert({ username: req.body.username })
    .then(() => {
      res.json({ message: `User ${req.body.username} created.` });
    })
    .catch((err) => {
      res.json({ message: `There was an error creating user: ${err}` });
    });
};

exports.userGetInOrderOfScore = async (req, res) => {
  knex("User")
    .orderBy("score", "desc")
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      res.json({ message: `There was an error retrieving user: ${err}` });
    });
};

exports.userGetByUsername = async (req, res) => {
  knex("User")
    .where("username", req.params.username)
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      res.json({ message: `There was an error retrieving user: ${err}` });
    });
};

exports.userUpdateByUsername = async (req, res) => {
  knex("User")
    .where("username", req.params.username)
    .update(req.body)
    .then(() => {
      res.json({ message: `User ${req.params.username} updated.` });
    })
    .catch((err) => {
      res.json({
        message: `There was an error updating ${id} Game: ${err}`,
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

exports.userDeleteByUsername = async (req, res) => {
  knex("User")
    .where("username", req.body.username)
    .del()
    .then(() => {
      res.json({ message: `User ${req.body.username} deleted.` });
    })
    .catch((err) => {
      res.json({ message: `There was an error deleting user: ${err}` });
    });
};

exports.userDeleteAll = async (req, res) => {
  knex("User")
    .truncate() // remove the selection
    .then(() => {
      res.json({ message: "User list cleared." });
    })
    .catch((err) => {
      res.json({ message: `There was an error resetting User list: ${err}.` });
    });
};
