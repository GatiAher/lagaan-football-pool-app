const knex = require("../db");
const gameScrapper54 = require("../web-scraping/schedule-scraper");

// Get all games from database
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

// Update specific game score
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
  // Find specific Game in the database and update it
  knex("Game")
    .where("id", id)
    .update({
      visPts,
      homePts,
      visStatus,
      homeStatus,
    })
    .then(() => {
      res.json({ message: `Game ${id} score updated.` });
    })
    .catch((err) => {
      res.json({
        message: `There was an error updating ${id} book: ${err}`,
      });
    });
};

// Remove all games on the list
exports.gameClear = async (req, res) => {
  knex
    .select("*")
    .from("Game")
    .truncate() // remove the selection
    .then(() => {
      res.json({ message: "Game list cleared." });
    })
    .catch((err) => {
      res.json({ message: `There was an error resetting Game list: ${err}.` });
    });
};

// clear old games and new games to database
exports.gameReset = async (req, res) => {
  const games = await gameScrapper54.getGames();
  const row = [
    {
      startTime: 1603645200000,
      week: "7",
      season: 54,
      visTeam: "Cleveland Browns",
      homeTeam: "Cincinnati Bengals",
    },
    {
      startTime: 1603645200000,
      week: "7",
      season: 54,
      visTeam: "Carolina Panthers",
      homeTeam: "New Orleans Saints",
    },
  ];
  await knex("Game").truncate();
  await knex
    .batchInsert("Game", games, 30)
    .then(() => {
      res.json({ message: "Game list created." });
    })
    .catch((err) => {
      res.json({ message: `There was an error resetting Game list: ${err}.` });
    });
};
