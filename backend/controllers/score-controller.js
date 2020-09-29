const knex = require("../db");
const { STATUS_TO_POINTS } = require("../constants/score");

const updateTeamScore = async (team, status) => {
  if (status === "win") {
    await knex("Team").where("id", team).increment({
      numOfWin: 1,
    });
  } else if (status === "tie") {
    await knex("Team").where("id", team).increment({
      numOfTie: 1,
    });
  } else if (status === "loss") {
    await knex("Team").where("id", team).increment({
      numOfLoss: 1,
    });
  }
};

const updateUserScore = async (team, status, week) => {
  await knex("User")
    .where(`wk${week}A`, team)
    .orWhere(`wk${week}B`, team)
    .increment({
      score: STATUS_TO_POINTS.get(status),
    });
};

const updateUserSelectionStatus = async (team, status, week, letter) => {
  await knex("User")
    .where(`wk${week}${letter}`, team)
    .update({
      [`sc${week}${letter}`]: status,
    });
};

exports.updateScore = async (req, res) => {
  const { id, visPts, homePts } = req.body;
  let visStatus, homeStatus;
  if (visPts > homePts) {
    visStatus = "win";
    homeStatus = "loss";
  } else if (visPts < homePts) {
    visStatus = "loss";
    homeStatus = "win";
  } else {
    visStatus = "tie";
    homeStatus = "tie";
  }
  const [season, week, visTeam, homeTeam] = id.split("_");
  try {
    // update Game score
    const numItem = await knex("Game").where("id", id).update({
      visPts,
      homePts,
      visStatus: visStatus,
      homeStatus: homeStatus,
    });

    if (numItem == 0) throw new Error("Game does not exist.");

    // update Team score
    // TODO: add recalculation option
    await updateTeamScore(homeTeam, homeStatus);
    await updateTeamScore(visTeam, visStatus);

    // update User selection status
    await updateUserSelectionStatus(homeTeam, homeStatus, week, "A");
    await updateUserSelectionStatus(homeTeam, homeStatus, week, "B");
    await updateUserSelectionStatus(visTeam, visStatus, week, "A");
    await updateUserSelectionStatus(visTeam, visStatus, week, "B");

    // update User score
    // TODO: add recalculation option
    await updateUserScore(homeTeam, homeStatus, week);
    await updateUserScore(visTeam, visStatus, week);

    // done
    res.json({ message: `Game ${id} updated. User scores updated.` });
  } catch (err) {
    res.json({
      message: `There was an error updating ${id} Game: ${err}`,
    });
  }
};
