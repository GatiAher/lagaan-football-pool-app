import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

type SelectionButtonProps = {
  team: string;
  week: number;
  currentWeek: number;
  savedSelections: any;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
  areTwoTeamsSelected: () => boolean;
};

const SelectionButton: React.FC<SelectionButtonProps> = ({
  children,
  team,
  week,
  currentWeek,
  savedSelections,
  handleTeamSelect,
  isTeamSelected,
  areTwoTeamsSelected,
}) => {
  // disable button if selected week is over
  let disabledVal = week < currentWeek;
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
