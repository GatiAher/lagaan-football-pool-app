import React from "react";

import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";

import { ReactComponent as LagaanPoolAdminLogo } from "./LagaanPoolAdmin.svg";

const Logo = () => {
  const theme = useTheme();
  return (
    <Box className="LagaanPoolAdminLogo" pt="1%">
      <LagaanPoolAdminLogo height="40px" stroke={theme.palette.secondary.light} />
    </Box>
  );
};
export default Logo;
