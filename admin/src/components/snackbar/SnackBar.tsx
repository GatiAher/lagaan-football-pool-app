import * as React from "react";

import SnackBarView from "./SnackBarView";

export type SnackBarProps = {
  status: "success" | "fail";
  message: string;
};

const Snackbar = ({ status, message }: SnackBarProps) => {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    setOpen(true);
    console.log(message);
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
