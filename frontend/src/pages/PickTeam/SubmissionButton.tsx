import React from "react";

import Button from "@material-ui/core/Button";

type SubmissionButtonProps = {
  selections: (string | number | undefined)[];
  onClick: () => void;
};

const SubmissionButton = ({ selections, onClick }: SubmissionButtonProps) => {
  return (
    <Button fullWidth variant="contained" color="primary" onClick={onClick}>
      {`Pick: ${selections}`}
    </Button>
  );
};

export default SubmissionButton;
