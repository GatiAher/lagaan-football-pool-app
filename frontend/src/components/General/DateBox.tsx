import React from "react";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import DateBoxDateDisplay from "./DateBoxDateDisplay";
import DateBoxByeDisplay from "./DateBoxByeDisplay";

type DateBoxProps = {
  startTime?: number;
  week?: number;
};

const DateBox: React.FC<DateBoxProps> = ({ children, startTime, week }) => {
  const theme = useTheme();
  if (startTime && week) {
    console.error("ERROR: DateBox cannot have startTime and week");
  }
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      bgcolor={theme.palette.background.default}
      py={4}
      pl={3}
    >
      <Box borderRight={1} color={theme.palette.grey.A200} width="60%" p={0}>
        {children}
      </Box>
      <Box m="auto">
        {startTime && <DateBoxDateDisplay miliseconds={startTime} />}
        {week && <DateBoxByeDisplay currentWeek={week} />}
      </Box>
    </Box>
  );
};

export default DateBox;
