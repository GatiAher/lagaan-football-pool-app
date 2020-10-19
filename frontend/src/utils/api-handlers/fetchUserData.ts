import axios from "axios";
import apiurl from "./apiurl"

import UserType from "../types/UserType";

export default (
    id: string,
    callback: (arg0: UserType[], arg1: boolean) => void
  ) => {
    axios
      .get(`${apiurl}/user/${id}`)
      .then((response) => {
        callback(response.data, true);
      })
      .catch(() => {
        callback([], false);
      });
  };