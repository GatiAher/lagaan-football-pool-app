const knex = require("../db");
const { STATUS_TO_POINTS } = require("../maps/scoreMap");
const { WEEKS } = require("../maps/weeks");

/**
 * Recalculate user scores
 */
exports.recalculateUserScore = async (req, res) => {
  const teams = await knex("Team");
  const users = await knex("User");

  // create map to easily access week status by team
  const teamsMap = new Map();
  for (let team of teams) {
    teamsMap.set(team.id, team);
  }

  // for each user, calculate its score
  const promises = [];
  for (let user of users) {
    let score = 0;
    let id = user.id;
    for (let wk of WEEKS) {
      if (user[`${wk}A`]) {
        score += STATUS_TO_POINTS.get(teamsMap.get(user[`${wk}A`])[wk]);
      }
      if (user[`${wk}B`]) {
        score += STATUS_TO_POINTS.get(teamsMap.get(user[`${wk}B`])[wk]);
      }
    }
    console.log("user final score:", score);
    // add this to an array of Promises
    promises.push(knex("User").where("id", id).update("score", score));
  }

  // keep track of these to return in final message
  const numTotalUsers = users.length;
  const numOfUpdatedUsers = (await Promise.all(promises)).length;
  res.json({
    message: `User: ${numOfUpdatedUsers} / ${numTotalUsers} users scored.`,
  });
};

/**
 * Recalculate team win, loss, tie
 */
exports.recalculateTeamScore = async (req, res) => {
  const teams = await knex("Team");

  // for each team, calculate its score
  const promises = [];
  for (let team of teams) {
    let numOfWin = 0;
    let numOfTie = 0;
    let numOfLoss = 0;
    let id = team.id;
    for (let wk of WEEKS) {
      let status = team[wk];
      if (status == "win") numOfWin++;
      else if (status == "tie") numOfTie++;
      else if (status == "loss") numOfLoss++;
    }
    console.log("W-L-T", `${numOfWin}-${numOfLoss}-${numOfTie}`);
    // add this to an array of Promises
    promises.push(
      knex("Team").where("id", id).update({
        numOfWin,
        numOfTie,
        numOfLoss,
      })
    );
  }

  // keep track of these to return in final message
  const numTotalTeams = teams.length;
  const numOfUpdatedTeams = (await Promise.all(promises)).length;
  res.json({
    message: `Team: ${numOfUpdatedTeams} / ${numTotalTeams} items updated.`,
  });
};
