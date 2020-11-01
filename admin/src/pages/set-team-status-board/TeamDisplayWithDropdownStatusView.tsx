import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

type TeamDisplayWithDropdownStatusViewProps = {
  teamId: string;
  initialValue: string;
  handleChange: (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => void;
};

const TeamDisplayWithDropdownStatusView = ({
  teamId,
  initialValue,
  handleChange,
}: TeamDisplayWithDropdownStatusViewProps) => {
  const classes = useStyles();

  return (
    <Box
      m={1}
      pl={1}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      border={1}
      borderRadius={4}
    >
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">{teamId}</InputLabel>
        <Select
          native
          value={initialValue}
          onChange={handleChange}
          inputProps={{
            name: teamId,
            id: "age-native-simple",
          }}
        >
          <option value="default">Default</option>
          <option value="win">Win</option>
          <option value="loss">Loss</option>
          <option value="tie">Tie</option>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TeamDisplayWithDropdownStatusView;
