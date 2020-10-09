// import React from "react";
// import GridList from "@material-ui/core/GridList";
// import GridListTile from "@material-ui/core/GridListTile";

// import PickByeSectionRow from "./PickByeSectionRow";

// const PickByeSection = ({
//   loading,
//   week,
//   savedSelections,
//   setSelectionA,
//   setSelectionB,
//   handleTeamSelect,
//   isTeamSelected,
//   isTwoTeamSelected,
// }: {
//   loading: boolean;
//   week: number;
//   savedSelections: any;
//   setSelectionA: (team: string) => void;
//   setSelectionB: (team: string) => void;
//   handleTeamSelect: (team: string) => void;
//   isTeamSelected: (team: string) => boolean;
//   isTwoTeamSelected: () => boolean;
// }) => {
//   // Show nothing
//   if (loading) return <div></div>;
//   return (
//     <GridList cellHeight="auto" cols={1}>
//       <GridListTile key="bye">
//         <PickByeSectionRow
//           key="BYE"
//           week={week}
//           savedSelections={savedSelections}
//           setSelectionA={setSelectionA}
//           setSelectionB={setSelectionB}
//           handleTeamSelect={handleTeamSelect}
//           isTeamSelected={isTeamSelected}
//           isTwoTeamSelected={isTwoTeamSelected}
//         />
//       </GridListTile>
//     </GridList>
//   );
// };

// export default PickByeSection;
