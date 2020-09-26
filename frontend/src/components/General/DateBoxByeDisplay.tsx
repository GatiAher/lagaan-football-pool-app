import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { BYE_WEEK_START, BYE_WEEK_END } from "../../utils/constants/bye-week";

const DateBoxByeDisplay = ({ currentWeek }: { currentWeek: number }) => {
  const isOpen = currentWeek >= BYE_WEEK_START && currentWeek <= BYE_WEEK_END;
  const textColor = !isOpen ? "textSecondary" : "textPrimary";
  return (
    <Box display="flex" flexDirection="column">
      <Typography
        color={textColor}
        variant="body2"
      >{`Week ${currentWeek}`}</Typography>
      <Typography color={textColor} variant="body2">
        {!isOpen ? "CLOSED" : "OPEN"}
      </Typography>
    </Box>
  );
};

export default DateBoxByeDisplay;
