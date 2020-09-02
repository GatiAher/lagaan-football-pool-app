const knex = require("../db");
const gameScrapper54 = require("../web-scraping/schedule-scraper_season_54");

exports.gameBySeasonAndWeek = async (req, res) => {
  knex("Game")
    .where({ season: req.params.season, week: req.params.week })
    .then((gameData) => {
      res.json(gameData);
    })
    .catch((err) => {
      res.json({ message: `There was an error retrieving games: ${err}` });
    });
};

exports.gameBySeason = async (req, res) => {
  knex("Game")
    .where("season", req.params.season)
    .then((gameData) => {
      res.json(gameData);
    })
    .catch((err) => {
      res.json({ message: `There was an error retrieving games: ${err}` });
    });
};

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

exports.gameUpdateScore = async (req, res) => {
  const { id, visPts, homePts } = req.body;
  let visStatus, homeStatus;
  if (visPts > homePts) {
    visStatus = 2;
    homeStatus = 0;
  } else if (visPts < homePts) {
    visStatus = 0;
    homeStatus = 2;
  } else {
    visStatus = 1;
    homeStatus = 1;
  }
  knex("Game")
    .where("id", id)
    .update({
      visPts,
      homePts,
      visStatus,
      homeStatus,
    })
    .then(() => {
      res.json({ message: `Game ${id} updated.` });
    })
    .catch((err) => {
      res.json({
        message: `There was an error updating ${id} Game: ${err}`,
      });
    });
};

// Remove all games on the list
exports.gameClear = async (req, res) => {
  knex("Game")
    .truncate() // remove the selection
    .then(() => {
      res.json({ message: "Game list cleared." });
    })
    .catch((err) => {
      res.json({ message: `There was an error resetting Game list: ${err}.` });
    });
};

// clear old games and add new games from web scraper to database
exports.gameReset = async (req, res) => {
  try {
    const games = await gameScrapper54.getGames();
    await knex("Game").truncate();
    await knex.batchInsert("Game", games, 30);
    res.json({ message: "Game list created." });
  } catch (err) {
    res.json({ message: `There was an error resetting Game list: ${err}.` });
  }
};
