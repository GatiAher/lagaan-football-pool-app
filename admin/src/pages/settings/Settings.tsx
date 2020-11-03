import { AxiosResponse } from "axios";
import * as React from "react";

import api from "../../api";

import SettingsView from "./SettingsView";

import SnackBar, { SnackBarProps } from "../../components/snackbar";

const callAPI = (
  apipromise: () => Promise<AxiosResponse>,
  callback: (arg0: SnackBarProps) => void
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
    (SnackBarProps & { date: Date }) | null
  >(null);

  const setSnackBarMessageUnique = (props: SnackBarProps) =>
    setSnackBarMessage({ ...props, date: new Date() });

  return (
    <div>
      <SettingsView
        scoreUser={() =>
          callAPI(api.score.recalculateUserScore, setSnackBarMessageUnique)
        }
        scoreTeam={() =>
          callAPI(api.score.recalculateTeamScore, setSnackBarMessageUnique)
        }
        clearUser={() => callAPI(api.user.clearTable, setSnackBarMessageUnique)}
        clearTeam={() => callAPI(api.team.clearTable, setSnackBarMessageUnique)}
        clearGame={() => callAPI(api.game.clearTable, setSnackBarMessageUnique)}
        resetUser={() => callAPI(api.user.resetTable, setSnackBarMessageUnique)}
        resetTeam={() => callAPI(api.team.resetTable, setSnackBarMessageUnique)}
        resetGame={() => callAPI(api.game.resetTable, setSnackBarMessageUnique)}
      />
      {snackBarMessage !== null && (
        <SnackBar
          key={snackBarMessage.date.valueOf()}
          message={snackBarMessage.message}
          status={snackBarMessage.status}
        />
      )}
    </div>
  );
};

export default Settings;
