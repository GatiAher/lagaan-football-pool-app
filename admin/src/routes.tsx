import * as React from "react";
import { Route } from "react-router-dom";
import Settings from "./pages/settings";

export default [<Route exact path="/settings" render={() => <Settings />} />];
