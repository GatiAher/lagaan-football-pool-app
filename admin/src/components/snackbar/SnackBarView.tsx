import * as React from "react";

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import { SnackBarProps } from "./SnackBarProps";

const errorSnackbarErrorColor = "#e57373";

type SnackBarViewProps = {
  open: boolean;
  handleClose: (event: any, reason: string) => void;
} & SnackBarProps;

const SnackBarView = ({
  open,
  status,
  handleClose,
  message,
}: SnackBarViewProps) => {
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
