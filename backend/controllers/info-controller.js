const knex = require("../db");

exports.getKickoffDate = async (req, res) => {
  knex("game")
    .orderBy("startTime", "asc")
    .first("startTime")
    .then((data) => {
      if (data) res.json(data);
      else res.json({ startTime: "2001-06-26 06:26 AM" });
    })
    .catch((err) => {
      res.status(500).json({
        message: `${TABLE}: there was an error getting the data: ${err}`,
      });
    });
};
