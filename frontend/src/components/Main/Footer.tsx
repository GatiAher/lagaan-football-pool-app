import React from "react";

import { AppBar, Typography, Box } from "@material-ui/core";

export default () => {
  return (
    <Box flexGrow={1} pt={5}>
      <AppBar position="static">
        <Box p={2} m="auto">
          <Typography variant="subtitle1">© 2020 Gati Aher</Typography>
        </Box>
      </AppBar>
    </Box>
  );
};
