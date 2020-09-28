import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const PrivateRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <CircularProgress />,
    })}
    {...args}
  />
);

export default PrivateRoute;
