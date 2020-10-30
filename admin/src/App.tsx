import React from "react";
// import { Admin, Resource } from "react-admin";
import { Admin, Resource } from "react-admin";

import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";
// copied from ra-import-csv to get english labels from import csv
import * as domainMessages from "./import-csv/build-watch/i18n";

import simpleRestProvider from "ra-data-simple-rest";
import authProvider from "./authProvider";
import { Layout } from "./layout";
import customRoutes from "./routes";
import { Dashboard } from "./dashboard";

import user from "./pages/user";
import game from "./pages/game";
import team from "./pages/team";

const dataProvider = simpleRestProvider(process.env.REACT_APP_API);

// Setup i18n
const i18nProvider = polyglotI18nProvider(
  (local) => ({ ...englishMessages, ...domainMessages.en }),
  "en"
);

const App = () => {
  return (
    <Admin
      dataProvider={dataProvider}
      customRoutes={customRoutes}
      authProvider={authProvider}
      dashboard={Dashboard}
      layout={Layout}
      i18nProvider={i18nProvider}
    >
      <Resource name="user" {...user} />
      <Resource name="game" {...game} />
      <Resource name="team" {...team} />
    </Admin>
  );
};

export default App;
