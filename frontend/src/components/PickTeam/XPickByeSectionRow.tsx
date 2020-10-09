// import React from "react";
// import Box from "@material-ui/core/Box";

// import DateBox from "../General/XDateBox";
// import SelectionButton from "./SelectionButton";
// import { BYE_WEEK_START, BYE_WEEK_END } from "../../utils/constants/bye-week";

// const PickByeSectionRow = (props: {
//   week: number;
//   savedSelections: any;
//   setSelectionA: (team: string) => void;
//   setSelectionB: (team: string) => void;
//   handleTeamSelect: (team: string) => void;
//   isTeamSelected: (team: string) => boolean;
//   isTwoTeamSelected: () => boolean;
// }) => {
//   let disableBye1 = false;
//   let disableBye2 = false;
//   if (props.week === BYE_WEEK_END) {
//     if (!props.savedSelections.includes("BYE1")) {
//       props.setSelectionA("BYE1");
//       disableBye1 = true;
//     }
//     if (!props.savedSelections.includes("BYE2")) {
//       props.setSelectionB("BYE2");
//       disableBye2 = true;
//     }
//   } else if (props.week < BYE_WEEK_START || props.week > BYE_WEEK_END) {
//     disableBye1 = true;
//     disableBye2 = true;
//   }
//   return (
//     <DateBox week={props.week}>
//       <Box
//         display="flex"
//         flexDirection="row"
//         justifyContent="space-evenly"
//         style={{ padding: 0, margin: 0 }}
//       >
//         <SelectionButton
//           team="BYE1"
//           disabled={disableBye1}
//           savedSelections={props.savedSelections}
//           handleTeamSelect={props.handleTeamSelect}
//           isTeamSelected={props.isTeamSelected}
//           isTwoTeamSelected={props.isTwoTeamSelected}
//         >
//           Bye 1
//         </SelectionButton>
//         <SelectionButton
//           team="BYE2"
//           disabled={disableBye1}
//           savedSelections={props.savedSelections}
//           handleTeamSelect={props.handleTeamSelect}
//           isTeamSelected={props.isTeamSelected}
//           isTwoTeamSelected={props.isTwoTeamSelected}
//         >
//           Bye 2
//         </SelectionButton>
//       </Box>
//     </DateBox>
//   );
// };

// export default PickByeSectionRow;
