import React from "react";
import { UserType } from "../../utils/types/user-type";
import "./LeaderboardList.css";
import { useUser } from "../../context/TempUserContext";

interface LeaderboardListRowProps {
  user: UserType;
}
export const LeaderboardListRow = (props: LeaderboardListRowProps) => {
  let className = "table-row";
  const { user } = useUser();
  if (user.user_id === props.user.user_id) {
    className = "table-row--active";
  }
  return (
    <tr className={className}>
      <td className="table-item">{props.user.rank}</td>
      <td className="table-item">{props.user.username}</td>
      <td className="table-item">{props.user.score}</td>
      <td className="table-item">{props.user.wk1A}</td>
      <td className="table-item">{props.user.wk1B}</td>
      <td className="table-item">{props.user.wk2A}</td>
      <td className="table-item">{props.user.wk2B}</td>
      <td className="table-item">{props.user.wk3A}</td>
      <td className="table-item">{props.user.wk3B}</td>
      <td className="table-item">{props.user.wk4A}</td>
      <td className="table-item">{props.user.wk4B}</td>
      <td className="table-item">{props.user.wk5A}</td>
      <td className="table-item">{props.user.wk5B}</td>
      <td className="table-item">{props.user.wk6A}</td>
      <td className="table-item">{props.user.wk6B}</td>
      <td className="table-item">{props.user.wk7A}</td>
      <td className="table-item">{props.user.wk7B}</td>
      <td className="table-item">{props.user.wk8A}</td>
      <td className="table-item">{props.user.wk8B}</td>
      <td className="table-item">{props.user.wk9A}</td>
      <td className="table-item">{props.user.wk9B}</td>
      <td className="table-item">{props.user.wk10A}</td>
      <td className="table-item">{props.user.wk10B}</td>
      <td className="table-item">{props.user.wk11A}</td>
      <td className="table-item">{props.user.wk11B}</td>
      <td className="table-item">{props.user.wk12A}</td>
      <td className="table-item">{props.user.wk12B}</td>
      <td className="table-item">{props.user.wk13A}</td>
      <td className="table-item">{props.user.wk13B}</td>
      <td className="table-item">{props.user.wk14A}</td>
      <td className="table-item">{props.user.wk14B}</td>
      <td className="table-item">{props.user.wk15A}</td>
      <td className="table-item">{props.user.wk15B}</td>
      <td className="table-item">{props.user.wk16A}</td>
      <td className="table-item">{props.user.wk16B}</td>
      <td className="table-item">{props.user.wk17A}</td>
      <td className="table-item">{props.user.wk17B}</td>
    </tr>
  );
};
