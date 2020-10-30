import * as React from "react";
import { forwardRef } from "react";
import { AppBar, UserMenu, MenuItemLink } from "react-admin";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/core/styles";

import Logo from "./Logo";

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  spacer: {
    flex: 1,
  },
});

const SettingsMenu = forwardRef<any, any>((props, ref) => {
  return (
    <MenuItemLink
      ref={ref}
      to="/settings"
      primaryText="Settings"
      leftIcon={<SettingsIcon />}
      onClick={props.onClick}
      sidebarIsOpen
    />
  );
});

const CustomUserMenu = (props: any) => (
  <UserMenu {...props}>
    <SettingsMenu />
  </UserMenu>
);

const CustomAppBar = (props: any) => {
  const classes = useStyles();
  return (
    <AppBar {...props} elevation={1} userMenu={<CustomUserMenu />}>
      <Typography
        variant="h6"
        color="inherit"
        className={classes.title}
        id="react-admin-title"
      />
      <Logo />
      <span className={classes.spacer} />
    </AppBar>
  );
};

export default CustomAppBar;
