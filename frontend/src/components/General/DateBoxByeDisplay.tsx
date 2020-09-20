import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const cutOffWeek = 10;

// TODO: replace with adjustable kick off date
const kickOffDate = new Date(2020, 8, 10).valueOf(); // 2020, Sept 10

const DateBoxByeDisplay = ({ currentWeek }: { currentWeek: number }) => {
  const isOver = currentWeek > cutOffWeek;
  const textColor = isOver ? "textSecondary" : "textPrimary";
  return (
    <Box display="flex" flexDirection="column">
      <Typography
        color={textColor}
        variant="body2"
      >{`Week ${cutOffWeek}`}</Typography>
      <Typography color={textColor} variant="body2">
        {isOver ? "DONE" : "OPEN"}
      </Typography>
    </Box>
  );
};

export default DateBoxByeDisplay;
