const knex = require("../db");

exports.teamAll = async (req, res) => {
  knex
    .select("*")
    .from("Team")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `There was an error retrieving users: ${err}` });
    });
};
