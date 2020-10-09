import React from "react";
import Box from "@material-ui/core/Box";

// TODO: implement this

export default ({
  firstString,
  secondString,
}: {
  firstString: string;
  secondString: string;
}) => {
  return (
    <Box px={1} pt={1} display="flex" flexDirection="row">
      <Box px={1} borderRadius={4} bgcolor="gray">
        {firstString}
      </Box>
      <Box px={1}>|</Box>
      <Box fontWeight="fontWeightBold">{secondString}</Box>
    </Box>
  );
};

// takes 2 strings, first, second
// takes 2 styles? first, second

// `Thurs, Oct 5, 8:00 PM EST` | **OPEN**
// `Thurs, Oct 5, 8:00 PM EST` | **CLOSED**

// `Weeks 4-12` | **OPEN**
// `Weeks 4-12` | **CLOSED**

// `Week 1` | **CLOSED**
// `Week 3` | **OPEN**

// NOTE: we only show picks on the leaderboard when matches are closed
