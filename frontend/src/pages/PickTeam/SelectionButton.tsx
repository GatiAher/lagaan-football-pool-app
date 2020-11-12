import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import TeamDisplay from "../../frontend-components/team-display/TeamDisplay";
import TeamType from "../../types/TeamType";

type SelectionButtonProps = {
  team: TeamType;
  disabled: boolean;
  highlighted: boolean;
  onClick: () => void;
};

const SelectionButton = ({
  team,
  disabled,
  highlighted,
  onClick,
}: SelectionButtonProps) => {
  let variant: ButtonProps["variant"] = "text";
  if (highlighted) {
    variant = "contained";
  }
  return (
    <Button
      style={{
        maxWidth: "100%",
        minWidth: "100%",
        padding: 0,
        borderRadius: 10,
      }}
      color="secondary"
      variant={variant}
      onClick={onClick}
      disabled={disabled}
    >
      <Box m={1} width="100%" border={1} borderRadius={10}>
        <TeamDisplay team={team} />
      </Box>
    </Button>
  );
};

export default SelectionButton;
