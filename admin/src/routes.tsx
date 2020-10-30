import * as React from "react";
import { Route } from "react-router-dom";
import Settings from "./settings/Settings";

export default [
  <Route exact path="/settings" render={() => <Settings />} />,
];
