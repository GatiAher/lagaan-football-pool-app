import React from "react";
import { Box } from "@material-ui/core";
import { dateParser } from "../../utils/date-parser";

const DateDisplay = (props: { miliseconds: number }) => {
  const dateObj = dateParser(props.miliseconds);
  return (
    <Box display="flex" flexDirection="column">
      <Box m="auto">{`${dateObj.day} ${dateObj.date}`}</Box>
      <Box m="auto">{dateObj.time}</Box>
    </Box>
  );
};

export default DateDisplay;
