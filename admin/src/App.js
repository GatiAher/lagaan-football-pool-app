import React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";

import simpleRestProvider from "ra-data-simple-rest";

import authProvider from "./authProvider";
import Dashboard from "./Dashboard/Dashboard";

// User
import UserIcon from "@material-ui/icons/Group";
import UserList from "./User/UserList";
import UserEdit from "./User/UserEdit";
import UserCreate from "./User/UserCreate";

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
    <Resource name="game" list={ListGuesser} />
  </Admin>
);

export default App;
