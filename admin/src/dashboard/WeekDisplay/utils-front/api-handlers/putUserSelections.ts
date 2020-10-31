import axios from "axios";
import apiurl from "./apiurl"

export default (
    id: string,
    body: any,
    callback: (arg0: any, arg1: boolean) => void
  ) => {
    axios
      .put(`${apiurl}/user/${id}`, body)
      .then((response) => {
        callback("Successfully updated team selections!", false);
      })
      .catch((error) => {
        callback(error.message, true);
      });
  };