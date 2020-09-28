import axios from "axios";
import { TeamToWinLossMap } from "../types/TeamType";

const fetchTeamWinLossMap = async (callback: (arg0: any) => void) => {
  axios
    .get("/team")
    .then((response) => {
      if (Array.isArray(response.data)) {
        const teamWinLossMap: TeamToWinLossMap = {};
        response.data.forEach((teamObj) => {
          teamWinLossMap[teamObj.id] = {
            numOfWin: teamObj.numOfWin,
            numOfLoss: teamObj.numOfLoss,
            numOfTie: teamObj.numOfLoss,
          };
        });
        callback(teamWinLossMap);
      }
    })
    .catch((error) =>
      console.error(`There was an error retrieving the team list: ${error}`)
    );
};

export default fetchTeamWinLossMap;
