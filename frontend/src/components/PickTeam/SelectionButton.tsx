import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";

type SelectionButtonProps = {
  team: string;
  disabled: boolean;
  savedSelections: any;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
  AreTwoTeamsSelected: () => boolean;
};

const SelectionButton: React.FC<SelectionButtonProps> = ({
  children,
  team,
  disabled,
  savedSelections,
  handleTeamSelect,
  isTeamSelected,
  AreTwoTeamsSelected,
}) => {
  let disabledVal = disabled;
  let variant: ButtonProps["variant"] = "text";
  if (isTeamSelected(team)) {
    variant = "contained";
  } else if (savedSelections.includes(team)) {
    disabledVal = true;
  } else if (AreTwoTeamsSelected()) {
    disabledVal = true;
  }
  return (
    <Button
      style={{
        maxWidth: "50%",
        minWidth: "50%",
        padding: 0,
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
