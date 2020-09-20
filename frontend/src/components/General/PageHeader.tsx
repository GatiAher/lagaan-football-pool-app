import React from "react";
import Typography from "@material-ui/core/Typography";

const PageHeader: React.FC = ({ children }) => {
  return <Typography variant="h4">{children}</Typography>;
};

export default PageHeader;
