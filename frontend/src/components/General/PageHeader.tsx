import React from "react";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const PageHeader: React.FC = ({ children }) => {
  return (
    <Box pt={4} pb={2}>
      <Typography variant="h4">{children}</Typography>
    </Box>
  );
};

export default PageHeader;
