import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const { authTokens } = useAuth();

  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        authTokens && restricted ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
