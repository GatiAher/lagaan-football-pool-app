import React from "react";
import Box from "@material-ui/core/Box";

import { useTheme } from "@material-ui/core";

type TileTagViewProps = {
  firstString: string;
  secondString: string;
};

const TileTagView = ({ firstString, secondString }: TileTagViewProps) => {
  const theme = useTheme();
  return (
    <Box px={1} pt={1} display="flex" flexDirection="row">
      <Box px={1} borderRadius={4} bgcolor={theme.palette.divider}>
        {firstString}
      </Box>
      <Box px={1}>|</Box>
      <Box fontWeight="fontWeightBold">{secondString}</Box>
    </Box>
  );
};

export default TileTagView;
