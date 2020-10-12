import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Button from "@material-ui/core/Button";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      variant="outlined"
      color="inherit"
      aria-label="log in"
      startIcon={<PersonIcon />}
      onClick={() => loginWithRedirect()}
    >
      <Typography variant="subtitle2">LOG IN</Typography>
    </Button>
  );
};

export default LoginButton;
