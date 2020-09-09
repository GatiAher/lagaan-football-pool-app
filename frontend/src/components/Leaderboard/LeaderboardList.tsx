import React from "react";
import { LeaderboardListRow } from "./LeaderboardListRow";
import { UserType } from "../../utils/types/user-type";

interface LeaderboardListProps {
  users: UserType[];
  loading: boolean;
}

export const LeaderboardList = (props: LeaderboardListProps) => {
  // Show loading message
  if (props.loading) return <p>Game table is loading...</p>;

  let rank = 0;
  let score = 0;
  if (props.users.length > 0) {
    props.users.forEach((user) => {
      if (user.score !== score) {
        rank += 1;
        score = user.score;
      }
      user.rank = rank;
    });
  }

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th className="table-head-item">Rank</th>
            <th className="table-head-item">Name</th>
            <th className="table-head-item">Score</th>
            <th className="table-head-item">wk1A</th>
            <th className="table-head-item">wk1B</th>
            <th className="table-head-item">wk2A</th>
            <th className="table-head-item">wk2B</th>
            <th className="table-head-item">wk3A</th>
            <th className="table-head-item">wk3B</th>
            <th className="table-head-item">wk4A</th>
            <th className="table-head-item">wk4B</th>
            <th className="table-head-item">wk5A</th>
            <th className="table-head-item">wk5B</th>
            <th className="table-head-item">wk6A</th>
            <th className="table-head-item">wk6B</th>
            <th className="table-head-item">wk7A</th>
            <th className="table-head-item">wk7B</th>
            <th className="table-head-item">wk8A</th>
            <th className="table-head-item">wk8B</th>
            <th className="table-head-item">wk9A</th>
            <th className="table-head-item">wk9B</th>
            <th className="table-head-item">wk10A</th>
            <th className="table-head-item">wk10B</th>
            <th className="table-head-item">wk11A</th>
            <th className="table-head-item">wk11B</th>
            <th className="table-head-item">wk12A</th>
            <th className="table-head-item">wk12B</th>
            <th className="table-head-item">wk13A</th>
            <th className="table-head-item">wk13B</th>
            <th className="table-head-item">wk14A</th>
            <th className="table-head-item">wk14B</th>
            <th className="table-head-item">wk15A</th>
            <th className="table-head-item">wk15B</th>
            <th className="table-head-item">wk16A</th>
            <th className="table-head-item">wk16B</th>
            <th className="table-head-item">wk17A</th>
            <th className="table-head-item">wk17B</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {props.users.length > 0 ? (
            props.users.map((user: UserType, idx) => (
              <LeaderboardListRow key={user.user_id} user={user} />
            ))
          ) : (
            <tr className="table-row">
              <td
                className="table-item"
                style={{ textAlign: "center" }}
                colSpan={37}
              >
                There are no games to show.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
