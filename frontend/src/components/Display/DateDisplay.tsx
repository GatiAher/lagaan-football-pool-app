import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { dateParser } from "../../utils/date-parser";

const DateDisplay = (props: { miliseconds: number }) => {
  const dateObj = dateParser(props.miliseconds);
  const isOver = Date.now() > props.miliseconds;
  const textColor = isOver ? "textSecondary" : "textPrimary";
  return (
    <Box display="flex" flexDirection="column">
      <Typography
        color={textColor}
        variant="body2"
      >{`${dateObj.day} ${dateObj.date}`}</Typography>
      <Typography color={textColor} variant="body2">
        {isOver ? "DONE" : dateObj.time}
      </Typography>
    </Box>
  );
};

export default DateDisplay;
