const knex = require("../db");
const gameScrapper54 = require("../web-scraping/schedule-scraper_season_54");
const { TEAMS } = require("../constants/teams");

////////////
// UPDATE //
////////////

exports.updateScore = async (req, res) => {
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
  const [season, week, visTeam, homeTeam] = id.split("_");
  try {
    // update Game
    await knex("Game").where("id", id).update({
      visPts,
      homePts,
      visStatus,
      homeStatus,
    });
    // update Team
    if (homeStatus === 2) {
      await knex("Team").where("id", homeTeam).increment({
        numOfWin: 1,
      });
    } else if (homeStatus === 1) {
      await knex("Team").where("id", homeTeam).increment({
        numOfTie: 1,
      });
    } else if (homeStatus === 0) {
      await knex("Team").where("id", homeTeam).increment({
        numOfLoss: 1,
      });
    }
    if (visStatus === 2) {
      await knex("Team").where("id", visTeam).increment({
        numOfWin: 1,
      });
    } else if (visStatus === 1) {
      await knex("Team").where("id", visTeam).increment({
        numOfTie: 1,
      });
    } else if (visStatus === 0) {
      await knex("Team").where("di", visTeam).increment({
        numOfLoss: 1,
      });
    }
    // update User
    await knex("User")
      .where(`wk${week}A`, homeTeam)
      .orWhere(`wk${week}B`, homeTeam)
      .increment({
        score: homeStatus,
      });
    await knex("User")
      .where(`wk${week}A`, visTeam)
      .orWhere(`wk${week}B`, visTeam)
      .increment({
        score: visStatus,
      });
    await knex("User")
      .where(`wk${week}A`, homeTeam)
      .update({
        [`sc${week}A`]: homeStatus,
      });
    await knex("User")
      .where(`wk${week}B`, homeTeam)
      .update({
        [`sc${week}B`]: homeStatus,
      });
    await knex("User")
      .where(`wk${week}A`, visTeam)
      .update({
        [`sc${week}A`]: visStatus,
      });
    await knex("User")
      .where(`wk${week}B`, visTeam)
      .update({
        [`sc${week}B`]: visStatus,
      });
    // done
    res.json({ message: `Game ${id} updated. User scores updated.` });
  } catch (err) {
    res.json({
      message: `There was an error updating ${id} Game: ${err}`,
    });
  }
};

///////////////
// CLEAR ALL //
///////////////

// Remove all games on the list
exports.gameClearAll = async (req, res) => {
  knex("Game")
    .truncate() // remove the selection
    .then(() => {
      res.json({ message: "Game list cleared." });
    })
    .catch((err) => {
      res.json({ message: `There was an error resetting Game list: ${err}.` });
    });
};

// Remove all users on the list
exports.userClearAll = async (req, res) => {
  knex("User")
    .truncate() // remove the selection
    .then(() => {
      res.json({ message: "User list cleared." });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `There was an error resetting User list: ${err}.` });
    });
};

///////////
// RESET //
///////////

// clear old teams and add teams to database
exports.teamResetAll = async (req, res) => {
  try {
    // reset team data
    const teams = TEAMS.map((id) => ({
      id,
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

// clear old games and add new games from web scraper to database
exports.gameResetAll = async (req, res) => {
  try {
    // reset game data
    const games = await gameScrapper54.getGames();
    await knex("Game").truncate();
    await knex.batchInsert("Game", games, 30);
    // done
    res.json({ message: "Game list created." });
  } catch (err) {
    res.json({ message: `There was an error resetting Game list: ${err}.` });
  }
};
