import * as React from "react";

import SnackBarView from "./SnackBarView";
import type { SnackBarProps } from "./SnackBarProps";

const Snackbar = ({ status, message }: SnackBarProps) => {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    setOpen(true);
  }, [status, message]);

  const handleClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <SnackBarView
      open={open}
      status={status}
      message={message}
      handleClose={handleClose}
    />
  );
};

export default Snackbar;
