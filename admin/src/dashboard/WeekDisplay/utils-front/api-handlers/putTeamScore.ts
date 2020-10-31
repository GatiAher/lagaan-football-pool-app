import axios from "axios";
import apiurl from "./apiurl"

export default (
    id: string,
    body: any,
    callback: (arg0: any, arg1: boolean) => void
  ) => {
    axios
      .put(`${apiurl}/team/${id}`, body)
      .then((response) => {
        callback("Successfully updated team status!", false);
      })
      .catch((error) => {
        callback(error.message, true);
      });
  };