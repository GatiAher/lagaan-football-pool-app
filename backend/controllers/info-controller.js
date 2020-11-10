const knex = require("../db");

exports.getKickoffDate = async (req, res) => {
  knex("game")
    .orderBy("startTime", "asc")
    .first("startTime")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: `${TABLE}: there was an error getting the data: ${err}`,
      });
    });
};
