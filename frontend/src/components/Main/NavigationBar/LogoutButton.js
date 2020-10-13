import React from "react";

import { useAuth0 } from "@auth0/auth0-react";

import Button from "@material-ui/core/Button";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";

const LogoutButton = () => {
  const { logout, user } = useAuth0();
  return (
    <Button
      variant="outlined"
      color="inherit"
      aria-label="log out"
      startIcon={<PersonIcon />}
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      <Typography variant="subtitle2">{`Hi ${user.nickname}!`}</Typography>
    </Button>
  );
};

export default LogoutButton;
