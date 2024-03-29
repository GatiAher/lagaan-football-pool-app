import React, { useState } from "react";

import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import { Routes, RoutesPlayoffs } from "../../routes";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  MenuList,
  MenuItem,
  ListItemSecondaryAction,
  Box,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

import { useCurrentWeek } from "../../contexts/CurrentWeekContext";

const AuthNav = () => {
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    return <LogoutButton />;
  } else return <LoginButton />;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    drawer: {
      width: 300,
    },
  })
);

const NavigationBar: React.FC<RouteComponentProps> = ({
  history,
  location,
  match,
}: RouteComponentProps) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  };

  const activeRoute = (routeName: any) => {
    return location.pathname === routeName ? true : false;
  };

  const { isAuthenticated } = useAuth0();

  const { currentWeek } = useCurrentWeek();
  const UseRoutes = currentWeek > 18 ? RoutesPlayoffs : Routes;

  return (
    <div>
      <Box flexGrow={1}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Box flexGrow={1}>
              <Typography variant="h6">Lagaan Pool</Typography>
            </Box>
            <AuthNav />
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        classes={{ paper: classes.drawer }}
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          width="auto"
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <MenuList>
            {UseRoutes.map((prop, key) => {
              return (
                <NavLink
                  to={prop.path}
                  style={{ textDecoration: "none" }}
                  key={key}
                >
                  <MenuItem selected={activeRoute(prop.path)}>
                    <Typography variant="inherit">
                      {prop.sidebarName}
                    </Typography>
                    {prop.private && !isAuthenticated && (
                      <ListItemSecondaryAction>
                        <LockOutlinedIcon fontSize="small" />
                      </ListItemSecondaryAction>
                    )}
                    {prop.private && isAuthenticated && (
                      <ListItemSecondaryAction>
                        <LockOpenIcon fontSize="small" />
                      </ListItemSecondaryAction>
                    )}
                  </MenuItem>
                </NavLink>
              );
            })}
          </MenuList>
        </Box>
      </Drawer>
    </div>
  );
};

export default withRouter(NavigationBar);
