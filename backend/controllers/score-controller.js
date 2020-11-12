const knex = require("../db");
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
  try {
    const promises = [];
    for (let user of users) {
      let score = 0;
      let numOfWin = 0;
      let numOfLoss = 0;
      let numOfTie = 0;
      let id = user.id;
      for (let wkObj of WEEKS) {
        if (user[wkObj.wk]) {
          let status = teamsMap.get(user[wkObj.wk])[wkObj.wk.slice(0, -1)];
          if (status == "win") {
            numOfWin++;
            score += wkObj.scorer.get(status);
          } else if (status == "loss") {
            numOfLoss++;
            score += wkObj.scorer.get(status);
          } else if (status == "tie") {
            numOfTie++;
            score += wkObj.scorer.get(status);
          }
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

    // for each user, calculate its rank
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
  } catch (error) {
    console.error(error);
  }
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
    for (let i = 1; i <= 21; i++) {
      let status = team[`wk${i}`];
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
