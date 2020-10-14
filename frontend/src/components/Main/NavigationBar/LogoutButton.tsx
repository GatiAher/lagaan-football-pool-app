import React from "react";
import { withStyles } from "@material-ui/core/styles";

import { useAuth0 } from "@auth0/auth0-react";

import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LogoutIcon from "@material-ui/icons/MeetingRoom";

import Button from "@material-ui/core/Button";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";

const StyledMenu = withStyles({})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const LogoutButton = () => {
  const { logout, user } = useAuth0();

  const handleLogout = () => {
    logout({
      returnTo: window.location.origin,
    });
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="inherit"
        aria-label="log out"
        aria-controls="user-options-menu"
        aria-haspopup="true"
        startIcon={<PersonIcon />}
        onClick={handleClick}
      >
        <Typography variant="subtitle2">{`Hi ${user.nickname}!`}</Typography>
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default LogoutButton;
