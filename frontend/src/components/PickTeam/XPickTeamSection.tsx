// import React from "react";
// import GridList from "@material-ui/core/GridList";
// import GridListTile from "@material-ui/core/GridListTile";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import Container from "@material-ui/core/Container";

// import PickTeamSectionRow from "./PickTeamSectionRow";
// import GameType from "../../utils/types/GameType";
// import { TeamToWinLossMap } from "../../utils/types/TeamType";

// const PickTeamSection = ({
//   loading,
//   games,
//   teamWinLossMap,
//   savedSelections,
//   handleTeamSelect,
//   isTeamSelected,
//   isTwoTeamSelected,
// }: {
//   loading: boolean;
//   games: GameType[];
//   teamWinLossMap: TeamToWinLossMap;
//   savedSelections: any;
//   handleTeamSelect: (team: string) => void;
//   isTeamSelected: (team: string) => boolean;
//   isTwoTeamSelected: () => boolean;
// }) => {
//   // Show loading message
//   if (loading) {
//     return <CircularProgress />;
//   }
//   return (
//     <GridList cellHeight="auto" cols={1}>
//       {games.map((game: GameType) => (
//         <GridListTile key={game.id}>
//           <PickTeamSectionRow
//             key={game.id}
//             game={game}
//             savedSelections={savedSelections}
//             teamWinLossMap={teamWinLossMap}
//             handleTeamSelect={handleTeamSelect}
//             isTeamSelected={isTeamSelected}
//             isTwoTeamSelected={isTwoTeamSelected}
//           />
//         </GridListTile>
//       ))}
//     </GridList>
//   );
// };

// export default PickTeamSection;
