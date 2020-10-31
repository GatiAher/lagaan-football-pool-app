import axios from "axios";
import apiurl from "./apiurl"

import TeamType from "../types/TeamType";

export default (callback: (arg0: any) => void) => {
  axios
    .get(`${apiurl}/team`)
    .then((response) => {
      const teamMap = new Map<string, TeamType>();
      if (Array.isArray(response.data)) {
        response.data.forEach((teamObj) => {
          teamMap.set(teamObj.id, teamObj);
        });
      }
      callback(teamMap);
    })
    .catch((error) => {
      console.error(
        `Encountered an error while retrieving the team list: ${error}`
      );
    });
};
