import { AxiosResponse } from "axios";
import * as React from "react";

import API from "../../api-handler";

import SettingsView from "./SettingsView";

import SnackBar from "../../components/snackbar";

type snackBarMessageI = {
  message: string;
  status: "success" | "fail";
};

const callAPI = (
  apipromise: () => Promise<AxiosResponse>,
  callback: (arg0: snackBarMessageI) => void
) => {
  apipromise()
    .then((res) => {
      if (res.hasOwnProperty("data")) {
        callback({ message: res.data.message, status: "success" });
      }
    })
    .catch((err) => {
      callback({ message: JSON.stringify(err), status: "fail" });
    });
};

const Settings = () => {
  const [snackBarMessage, setSnackBarMessage] = React.useState<
    (snackBarMessageI & { date: Date }) | null
  >(null);

  const setSnackBarMessageUnique = (props: snackBarMessageI) =>
    setSnackBarMessage({ ...props, date: new Date() });

  return (
    <div>
      <SettingsView
        scoreUser={() =>
          callAPI(API.score.recalculateUserScore, setSnackBarMessageUnique)
        }
        scoreTeam={() =>
          callAPI(API.score.recalculateTeamScore, setSnackBarMessageUnique)
        }
        clearUser={() => callAPI(API.user.clearTable, setSnackBarMessageUnique)}
        clearTeam={() => callAPI(API.team.clearTable, setSnackBarMessageUnique)}
        clearGame={() => callAPI(API.game.clearTable, setSnackBarMessageUnique)}
        resetUser={() => callAPI(API.user.resetTable, setSnackBarMessageUnique)}
        resetTeam={() => callAPI(API.team.resetTable, setSnackBarMessageUnique)}
        resetGame={() => callAPI(API.game.resetTable, setSnackBarMessageUnique)}
      />
      {snackBarMessage !== null && <SnackBar key={snackBarMessage.date.valueOf()} message={snackBarMessage.message} status={snackBarMessage.status} />}
    </div>
  );
};

export default Settings;
