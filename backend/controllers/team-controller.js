const knex = require("../db");
const { TEAMS } = require("../constants/teams");

exports.teamGetAll = async (req, res) => {
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

// clear old teams and add teams games to database
exports.teamReset = async (req, res) => {
  try {
    // reset team data
    const teams = TEAMS.map((team) => ({
      team,
    }));
    console.log(teams);
    await knex("Team").truncate();
    await knex.batchInsert("Team", teams, 35);
    // done
    res.json({ message: "Team list created." });
  } catch (err) {
    res.json({ message: `There was an error resetting Team list: ${err}.` });
  }
};
