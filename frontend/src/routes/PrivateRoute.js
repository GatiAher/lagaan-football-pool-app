import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const PrivateRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <LinearProgress />,
    })}
    {...args}
  />
);

export default PrivateRoute;
