import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const isAuthenticated = useAuth();

  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && restricted ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
