const knex = require("../db");

exports.gameAll = async (req, res) => {
  knex
    .select("*")
    .from("Game")
    .then((gameData) => {
      res.json(gameData);
    })
    .catch((err) => {
      res.json({ message: `There was an error retrieving games: ${err}` });
    });
};

exports.gameByWeek = async (req, res) => {
  knex("Game")
    .where({ week: req.params.week })
    .then((gameData) => {
      res.json(gameData);
    })
    .catch((err) => {
      res.json({ message: `There was an error retrieving games: ${err}` });
    });
};
