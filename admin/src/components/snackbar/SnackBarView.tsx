import * as React from "react";

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

const errorSnackbarErrorColor = "#e57373";

type SnackBarViewProps = {
  open: boolean;
  status: "success" | "fail";
  handleClose: (event: any, reason: string) => void;
  message: string;
};

const SnackBarView = ({
  open,
  status,
  handleClose,
  message,
}: SnackBarViewProps) => {
  console.log("my message", message);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      {status === "fail" ? (
        <SnackbarContent
          style={{ backgroundColor: errorSnackbarErrorColor }}
          message={message}
        />
      ) : (
        <SnackbarContent message={message} />
      )}
    </Snackbar>
  );
};

export default SnackBarView;
