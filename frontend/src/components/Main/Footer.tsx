import React from "react";
import { useTheme } from "@material-ui/core";

import Box from "@material-ui/core/Box";

export default () => {
  const theme = useTheme();
  return (
    <Box
      flexGrow={1}
      height="80px"
      style={{
        marginTop: "calc(5% + 60px)",
        bottom: 0,
      }}
      bgcolor={theme.palette.primary.light}
    >
      <Box p={2} m="auto" textAlign="center" color={theme.palette.grey[100]}>
        © 2020 Gati Aher
      </Box>
    </Box>
  );
};
