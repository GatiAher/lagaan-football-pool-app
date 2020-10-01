const knex = require("../db");
const gameScrapper54 = require("../web-scraping/schedule-scraper_season_54");
const { TEAMS } = require("../constants/teams");

module.exports = function (TABLE) {
  const module = {};

  // clear old games and add new games from web scraper to database
  const resetTableGame = async (req, res) => {
    try {
      // get new game items
      const games = await gameScrapper54.getGames();
      await knex("Game").truncate();
      await knex.batchInsert("Game", games, 30);
      // done
      res.json({ message: "Game: table cleared and repopulated." });
    } catch (err) {
      res
        .status(500)
        .json({ message: `Game: there was an error resetting items: ${err}.` });
    }
  };

  // clear old teams and add teams to database
  const resetTableTeam = async (req, res) => {
    try {
      // get new team items
      const teams = TEAMS.map((id) => ({
        id,
      }));
      await knex("Team").truncate();
      await knex.batchInsert("Team", teams, 35);
      // done
      res.json({ message: "Team: table cleared and repopulated." });
    } catch (err) {
      res
        .status(500)
        .json({ message: `Team: there was an error resetting items: ${err}.` });
    }
  };

  // keep users but erase all associated data
  const resetTableUser = async (req, res) => {
    // create blank user record
    const updateRecord = {
      rank: null,
      score: 0,
    };
    for (let i = 1; i <= 17; i++) {
      updateRecord[`wk${i}A`] = null;
      updateRecord[`wk${i}B`] = null;
      updateRecord[`sc${i}A`] = null;
      updateRecord[`sc${i}B`] = null;
    }
    knex("USER")
      .update(updateRecord)
      .then((numItems) => {
        res.json({
          message: `USER: ${numItems} users reset.`,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: `USER: there was an error updating users: ${err}`,
        });
      });
  };

  if (TABLE == "GAME") module.resetTable = resetTableGame;
  else if (TABLE == "TEAM") module.resetTable = resetTableTeam;
  else if (TABLE == "USER") module.resetTable = resetTableUser;

  return module;
};