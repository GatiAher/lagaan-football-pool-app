import React from "react";

import { AppBar, Typography, Box } from "@material-ui/core";
import { BorderTop } from "@material-ui/icons";

export default () => {
  return (
    <Box
      flexGrow={1}
      style={{
        marginTop: "calc(5% + 60px)",
        bottom: 0,
      }}
    >
      <AppBar position="sticky">
        <Box p={2} m="auto">
          <Typography variant="subtitle1">© 2020 Gati Aher</Typography>
        </Box>
      </AppBar>
    </Box>
  );
};
