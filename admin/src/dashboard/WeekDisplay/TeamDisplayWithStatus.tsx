import React from "react";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import TeamType from "./utils-front/types/TeamType";

import putTeamScore from "./utils-front/api-handlers/putTeamScore"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default ({ team, week }: { team: TeamType; week: number }) => {
  const classes = useStyles();
  // @ts-ignore
  const [state, setState] = React.useState(team[`wk${week}`]);

  // @ts-ignore
  const handleChange = (event) => {
    setState(event.target.value);
    const body = {};
    // @ts-ignore
      body[`wk${week}`] = event.target.value;
      putTeamScore(event.target.value, body, (message: string, isFail: boolean) => {
          
      })
  };

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
        <InputLabel htmlFor="age-native-simple">{team.id}</InputLabel>
        <Select
          native
          value={state}
          onChange={handleChange}
          inputProps={{
            name: team.id,
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
