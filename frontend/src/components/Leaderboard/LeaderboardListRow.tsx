import React from "react";
import { UserType } from "../../utils/types/user-type";
import { useUser } from "../../context/TempUserContext";

const makeTeamSelectionsList = (user: UserType) => {
  const teamSelections = [];
  let i;
  for (i = 1; i <= 17; i++) {
    // @ts-ignore
    teamSelections.push([user[`wk${i}A`], user[`sc${i}A`]]);
    // @ts-ignore
    teamSelections.push([user[`wk${i}B`], user[`sc${i}B`]]);
  }
  return teamSelections;
};

const getTableItemClassName = (status: number) => {
  let className = "table-item";
  switch (status) {
    case 1:
      className = "table-item tie";
      break;
    case 2:
      className = "table-item win";
      break;
    case 0:
      className = "table-item lose";
      break;
  }
  return className;
};

interface LeaderboardListRowProps {
  user: UserType;
}

export const LeaderboardListRow = (props: LeaderboardListRowProps) => {
  let className = "table-row";
  const { user } = useUser();
  if (user.user_id === props.user.user_id) {
    className = "table-row--active";
  }
  const teamSelections = makeTeamSelectionsList(props.user);
  return (
    <tr className={className}>
      <td className="table-item">{props.user.rank}</td>
      <td className="table-item">{props.user.username}</td>
      <td className="table-item">{props.user.score}</td>
      {teamSelections.map((item) => (
        <td className={getTableItemClassName(item[1])}>{item[0]}</td>
      ))}
    </tr>
  );
};
