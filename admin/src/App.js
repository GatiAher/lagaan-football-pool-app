import React from "react";
import { Admin, Resource } from "react-admin";

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

const dataProvider = simpleRestProvider("http://localhost:3001");

const App = () => (
  <Admin
    dashboard={Dashboard}
    authProvider={authProvider}
    dataProvider={dataProvider}
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

export default App;
