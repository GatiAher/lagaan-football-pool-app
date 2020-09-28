import axios from "axios";

const fetchGames = async (week: number, callback: (arg0: any) => void) => {
  const query = {
    sort: JSON.stringify(["startTime", "asc"]),
    filter: JSON.stringify({ week: week }),
  };
  axios
    .get("/game", { params: query })
    .then((response) => {
      callback(response.data);
    })
    .catch((error) =>
      console.error(`There was an error retrieving the game list: ${error}`)
    );
};

export default fetchGames;
