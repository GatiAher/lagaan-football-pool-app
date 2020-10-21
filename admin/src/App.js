import React from "react";
// import { Admin, Resource } from "react-admin";
import { Admin, Resource } from "react-admin";

import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";
// copied from ra-import-csv to get english labels from import csv
import * as domainMessages from "./import-csv/build-watch/i18n";

import simpleRestProvider from "ra-data-simple-rest";

import authProvider from "./authProvider";
import Dashboard from "./Dashboard/Dashboard";

// User
import UserIcon from "@material-ui/icons/Group";
import UserList from "./User/UserList";
import UserEdit from "./User/UserEdit";
import UserCreate from "./User/UserCreate";

// Game
import GameIcon from "@material-ui/icons/SportsFootball";
import GameList from "./Game/GameList";
import GameEdit from "./Game/GameEdit";
import GameCreate from "./Game/GameCreate";

// Team
import TeamIcon from "@material-ui/icons/GroupWork";
import TeamList from "./Team/TeamList";
import TeamEdit from "./Team/TeamEdit";
import TeamCreate from "./Team/TeamCreate";

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
