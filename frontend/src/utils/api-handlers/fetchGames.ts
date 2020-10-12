import axios from "axios";
import GameType from "../types/GameType";

export default (week: number, callback: (arg0: GameType[]) => void) => {
  const query = {
    sort: JSON.stringify(["startTime", "asc"]),
    filter: JSON.stringify({ week: week }),
  };
  axios
    .get("/game", { params: query })
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      console.error(
        `Encountered an error while retrieving the game list: ${error}`
      );
    });
};
