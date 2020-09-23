import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { Box } from "@material-ui/core";

type SelectionButtonProps = {
  team: string;
  disabled: boolean;
  savedSelections: any;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
  isTwoTeamSelected: () => boolean;
};

const SelectionButton: React.FC<SelectionButtonProps> = ({
  children,
  team,
  disabled,
  savedSelections,
  handleTeamSelect,
  isTeamSelected,
  isTwoTeamSelected,
}) => {
  let disabledVal = disabled;
  let variant: ButtonProps["variant"] = "outlined";
  if (isTeamSelected(team)) {
    variant = "contained";
  } else if (savedSelections.includes(team)) {
    disabledVal = true;
  } else if (isTwoTeamSelected()) {
    disabledVal = true;
  }
  return (
    <Button
      style={{
        maxWidth: "40%",
        minWidth: "40%",
      }}
      color="secondary"
      variant={variant}
      onClick={() => {
        handleTeamSelect(team);
      }}
      disabled={disabledVal}
    >
      {children}
    </Button>
  );
};

export default SelectionButton;
