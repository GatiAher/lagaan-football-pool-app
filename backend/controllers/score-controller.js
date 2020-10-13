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
    let numOfWin = 0;
    let numOfLoss = 0;
    let numOfTie = 0;
    let id = user.id;
    for (let wk of WEEKS) {
      if (user[`${wk}A`]) {
        let statusA = teamsMap.get(user[`${wk}A`])[wk];
        if (statusA == "win") {
          numOfWin++;
        } else if (statusA == "loss") {
          numOfLoss++;
        } else if (statusA == "tie") {
          numOfTie++;
        }
        score += STATUS_TO_POINTS.get(statusA);
      }
      if (user[`${wk}B`]) {
        let statusB = teamsMap.get(user[`${wk}B`])[wk];
        if (statusB == "win") {
          numOfWin++;
        } else if (statusB == "loss") {
          numOfLoss++;
        } else if (statusB == "tie") {
          numOfTie++;
        }
        score += STATUS_TO_POINTS.get(statusB);
      }
    }
    // add this to an array of Promises
    promises.push(
      knex("User")
        .where("id", id)
        .update({ score, numOfWin, numOfLoss, numOfTie })
    );
  }

  // keep track of these to return in final message
  const numTotalUsers = users.length;
  await Promise.all(promises).length;

  const rankedUsers = await knex("User").orderBy("score", "desc");

  // for each user, calculate its score
  const rankPromises = [];
  let rank = 1;
  let position = 1;
  let compareScore = null;
  for (let user of rankedUsers) {
    let id = user.id;
    if (user.score !== compareScore) {
      compareScore = user.score;
      rank = position;
    }
    rankPromises.push(knex("User").where("id", id).update("rank", rank));
    position++;
  }

  // keep track of these to return in final message
  const numOfRankedUsers = (await Promise.all(rankPromises)).length;

  res.json({
    message: `User: ${numOfRankedUsers} / ${numTotalUsers} users scored.`,
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
