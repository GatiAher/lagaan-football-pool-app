import React from "react";

import SelectionButton from "./SelectionButton";

import GameByWeek, {
  TeamDisplayWrapperProps,
} from "../../components/game-by-week";

type PickTeamRegularViewProps = {
  week: number;
  selections: (string | number | undefined)[];
  pastSelections: (string | number | undefined)[];
  handleSelection: (team: string) => void;
};

const PickTeamRegularView = ({
  week,
  selections,
  pastSelections,
  handleSelection,
}: PickTeamRegularViewProps) => {
  const TeamDisplayWrapper = (props: TeamDisplayWrapperProps) => {
    return (
      <SelectionButton
        team={props.team}
        disabled={
          !props.isPickWindowOpen ||
          pastSelections.includes(props.team.id) ||
          (selections.length >= 2 && !selections.includes(props.team.id))
        }
        highlighted={selections.includes(props.team.id)}
        onClick={() => handleSelection(props.team.id)}
      />
    );
  };

  return <GameByWeek render={TeamDisplayWrapper} week={week} hasBye />;
};

export default PickTeamRegularView;
