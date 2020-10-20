import React from "react";
import { withStyles } from "@material-ui/core/styles";

import { useAuth0 } from "@auth0/auth0-react";

import Snackbar from "@material-ui/core/Snackbar";

import Button from "@material-ui/core/Button";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";

import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LogoutIcon from "@material-ui/icons/MeetingRoom";

import Box from "@material-ui/core/Box";
import CopyToClipboard from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";

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

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

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
        <Typography variant="subtitle2">{`${user.nickname}`}</Typography>
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
        <MenuItem onClick={handleClose}>
          <CopyToClipboard text={user.sub} onCopy={() => setOpenSnackbar(true)}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <ListItemIcon>
                <FileCopyIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Registration Id" />
            </Box>
          </CopyToClipboard>
        </MenuItem>
      </StyledMenu>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          setOpenSnackbar(false);
        }}
        message="Copied Registration Id to clipboard!"
      />
    </div>
  );
};

export default LogoutButton;
