import React from "react";
// import { Admin, Resource } from "react-admin";
import { Admin, Resource } from "react-admin";

import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";
// copied from ra-import-csv to get english labels from import csv
import * as domainMessages from "./import-csv/build-watch/i18n";

import simpleRestProvider from "ra-data-simple-rest";

import authProvider from "./authProvider";
import Dashboard from "./components/Dashboard/Dashboard";

// User
import UserIcon from "@material-ui/icons/Group";
import UserList from "./components/User/UserList";
import UserEdit from "./components/User/UserEdit";
import UserCreate from "./components/User/UserCreate";

// Game
import GameIcon from "@material-ui/icons/SportsFootball";
import GameList from "./components/Game/GameList";
import GameEdit from "./components/Game/GameEdit";
import GameCreate from "./components/Game/GameCreate";

// Team
import TeamIcon from "@material-ui/icons/GroupWork";
import TeamList from "./components/Team/TeamList";
import TeamEdit from "./components/Team/TeamEdit";
import TeamCreate from "./components/Team/TeamCreate";

const dataProvider = simpleRestProvider(process.env.REACT_APP_API);

console.log("REACT_APP_API", process.env.REACT_APP_API);
console.log("NODE_ENV", process.env.NODE_ENV);

const App = () => {
  // Setup i18n
  const i18nProvider = polyglotI18nProvider(
    (local) => ({ ...englishMessages, ...domainMessages.en }),
    "en"
  );

  return (
    <Admin
      dashboard={Dashboard}
      authProvider={authProvider}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
    >
      <Resource
        name="user"
        icon={UserIcon}
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
      />
      <Resource
        name="game"
        icon={GameIcon}
        list={GameList}
        edit={GameEdit}
        create={GameCreate}
      />
      <Resource
        name="team"
        icon={TeamIcon}
        list={TeamList}
        edit={TeamEdit}
        create={TeamCreate}
      />
    </Admin>
  );
};

export default App;
