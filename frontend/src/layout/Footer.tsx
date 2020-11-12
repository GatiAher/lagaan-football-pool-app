import React from "react";
import { Button, IconButton, useTheme } from "@material-ui/core";

import Box from "@material-ui/core/Box";

import GitHubIcon from "@material-ui/icons/GitHub";

export default () => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80px"
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
      }}
      bgcolor={theme.palette.primary.light}
    >
      <Box>
        <Button
          variant="text"
          style={{ color: theme.palette.grey[100] }}
          startIcon={
            <GitHubIcon
              fontSize="small"
              style={{ color: theme.palette.grey[100] }}
            />
          }
          onClick={() => {
            window.location.href =
              "https://github.com/GatiAher/lagaan-football-pool-app";
          }}
        >
          <Box pt="3px">2020 Gati Aher</Box>
        </Button>
      </Box>
    </Box>
  );
};
