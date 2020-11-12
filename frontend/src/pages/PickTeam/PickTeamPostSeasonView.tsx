import React from "react";

import SelectionButton from "./SelectionButton";

import GameByWeek, {
  TeamDisplayWrapperProps,
} from "../../components/game-by-week";

type PickTeamPostSeasonViewProps = {
  week: number;
  selections: (string | number | undefined)[];
  handleSelection: (team: string) => void;
};

const PickTeamPostSeasonView = ({
  week,
  selections,
  handleSelection,
}: PickTeamPostSeasonViewProps) => {
  const manageGameLevelState = (
    state: string,
    setState: (arg0: string) => void,
    setStateOpp: (arg0: string) => void,
    selected: boolean
  ) => {
    if (selected) {
      // select
      setState("selected");
      setStateOpp("unavailable");
    } else if (state === "selected") {
      // deselect
      setState("");
      setStateOpp("");
    }
  };

  const TeamDisplayWrapper = (props: TeamDisplayWrapperProps) => {
    manageGameLevelState(
      props.state,
      props.setState,
      props.setStateOpp,
      selections.includes(props.team.id)
    );
    return (
      <SelectionButton
        team={props.team}
        disabled={!props.isPickWindowOpen || props.state === "unavailable"}
        highlighted={selections.includes(props.team.id)}
        onClick={() => {
          handleSelection(props.team.id);
          manageGameLevelState(
            props.state,
            props.setState,
            props.setStateOpp,
            selections.includes(props.team.id)
          );
        }}
      />
    );
  };

  return <GameByWeek render={TeamDisplayWrapper} week={week} hasBye />;
};

export default PickTeamPostSeasonView;
