import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import TeamDisplay from "../../front-end-specific-components/team-display/TeamDisplay";
import TeamType from "../../types/TeamType";

type SelectionButtonProps = {
  team: TeamType;
  disabled: boolean;
  savedSelections: any;
  handleTeamSelect: (team: string) => void;
  isTeamSelected: (team: string) => boolean;
  areTwoTeamsSelected: () => boolean;
};

const SelectionButton = ({
  team,
  disabled,
  savedSelections,
  handleTeamSelect,
  isTeamSelected,
  areTwoTeamsSelected,
}: SelectionButtonProps) => {
  const teamId = team.id;
  let disabledVal = disabled;
  let variant: ButtonProps["variant"] = "text";
  if (isTeamSelected(teamId)) {
    variant = "contained";
  } else if (savedSelections.includes(teamId) || areTwoTeamsSelected()) {
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
        handleTeamSelect(teamId);
      }}
      disabled={disabledVal}
    >
      <Box m={1} width="100%" border={1} borderRadius={10}>
        <TeamDisplay team={team} />
      </Box>
    </Button>
  );
};

export default SelectionButton;
