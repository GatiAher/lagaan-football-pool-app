import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";

const SelectionButton = (props: {
  team: string;
  disabled: boolean;
  savedSelections: any;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
  isTwoTeamSelected: () => boolean;
}) => {
  let disabled = props.disabled;
  let variant: ButtonProps["variant"] = "outlined";
  if (props.isTeamSelected(props.team)) {
    variant = "contained";
  } else if (props.savedSelections.includes(props.team)) {
    disabled = true;
  } else if (props.isTwoTeamSelected()) {
    disabled = true;
  }
  return (
    <Button
      color="secondary"
      variant={variant}
      onClick={() => {
        props.handleTeamSelect(props.team);
      }}
      disabled={disabled}
    >
      {props.team}
    </Button>
  );
};

export default SelectionButton;
