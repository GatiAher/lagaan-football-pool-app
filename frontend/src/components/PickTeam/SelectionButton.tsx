import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

type SelectionButtonProps = {
  team: string;
  disabled: boolean;
  savedSelections: any;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
  areTwoTeamsSelected: () => boolean;
};

const SelectionButton: React.FC<SelectionButtonProps> = ({
  children,
  team,
  disabled,
  savedSelections,
  handleTeamSelect,
  isTeamSelected,
  areTwoTeamsSelected,
}) => {
  let disabledVal = disabled;
  let variant: ButtonProps["variant"] = "text";
  if (isTeamSelected(team)) {
    variant = "contained";
  } else if (savedSelections.includes(team) || areTwoTeamsSelected()) {
    disabledVal = true;
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
      onClick={() => {
        handleTeamSelect(team);
      }}
      disabled={disabledVal}
    >
      <Box m={1} width="100%" border={1} borderRadius={10}>
        {children}
      </Box>
    </Button>
  );
};

export default SelectionButton;
