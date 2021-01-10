import React from "react";

import Button from "@material-ui/core/Button";

type SubmissionButtonProps = {
  selections: (string | number | undefined)[];
  onClick: () => void;
};

const SubmissionButton = ({ selections, onClick }: SubmissionButtonProps) => {
  let selectionString = "";
  for (let s of selections) {
    if (s !== "") {
      selectionString = selectionString + " " + s;
    }
  }
  return (
    <Button fullWidth variant="contained" color="primary" onClick={onClick}>
      {`Pick: ${selectionString}`}
    </Button>
  );
};

export default SubmissionButton;
