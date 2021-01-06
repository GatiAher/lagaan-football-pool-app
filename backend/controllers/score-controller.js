const knex = require("../db");
const { WEEKS, WEEKSPLAYOFF } = require("../maps/weeks");

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
      let id = user.id;

      let score = 0;
      let numOfWin = 0;
      let numOfLoss = 0;
      let numOfTie = 0;

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

      let scorePlayoff = 0;
      let numOfWinPlayoff = 0;
      let numOfLossPlayoff = 0;
      let numOfTiePlayoff = 0;

      for (let wkObj of WEEKSPLAYOFF) {
        if (user[wkObj.wk]) {
          let status = teamsMap.get(user[wkObj.wk])[wkObj.wk.slice(0, -1)];
          if (status == "win") {
            numOfWinPlayoff++;
            scorePlayoff += wkObj.scorer.get(status);
          } else if (status == "loss") {
            numOfLossPlayoff++;
            scorePlayoff += wkObj.scorer.get(status);
          } else if (status == "tie") {
            numOfTiePlayoff++;
            scorePlayoff += wkObj.scorer.get(status);
          }
        }
      }

      // add this to an array of Promises
      promises.push(
        knex("User").where("id", id).update({
          score,
          numOfWin,
          numOfLoss,
          numOfTie,
          scorePlayoff,
          numOfWinPlayoff,
          numOfLossPlayoff,
          numOfTiePlayoff,
        })
      );
    }

    // keep track of these to return in final message
    const numTotalUsers = users.length;
    const numOfUpdatedUsers = (await Promise.all(promises)).length;

    res.json({
      message: `User: ${numOfUpdatedUsers} / ${numTotalUsers} users scored.`,
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
