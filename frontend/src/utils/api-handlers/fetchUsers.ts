import axios from "axios";
import apiurl from "./apiurl"

export default (callback: (arg0: any) => void) => {
    const query = {
      sort: JSON.stringify(["score", "desc"]),
    };
    axios
      .get(`${apiurl}/user`, { params: query })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.error(
          `Encountered an error while retrieving the game list: ${error}`
        );
      });
  };