import React, { useEffect, useState, useCallback } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SeasonGameList from "./SeasonGameList";
import Box from "@material-ui/core/Box";

const fetchGames = async (
  week: number,
  setGames: (arg0: any) => void,
  setLoading: (arg0: boolean) => void
) => {
  axios
    .get(`/game/week/${week}`)
    .then((response) => {
      setGames(response.data);
      setLoading(false);
    })
    .catch((error) =>
      console.error(`There was an error retrieving the game list: ${error}`)
    );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(2),
      minWidth: 240,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export const SeasonGame = () => {
  const classes = useStyles();
  const [games, setGames] = useState([]);
  const [week, setWeek] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchGamesCallback = useCallback(() => {
    fetchGames(week, setGames, setLoading);
  }, [week]);

  // Fetch all books on initial render
  useEffect(() => {
    fetchGamesCallback();
  }, [week]);

  return (
    <Box>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Week</InputLabel>
        <Select
          native
          value={week}
          onChange={(e) => {
            // @ts-ignore
            setWeek(parseInt(e.target.value, 10));
          }}
          label="Week"
          inputProps={{
            name: "week",
            id: "outlined-week-native-simple",
          }}
        >
          <option value={1}>WEEK 1</option>
          <option value={2}>WEEK 2</option>
          <option value={3}>WEEK 3</option>
          <option value={4}>WEEK 4</option>
          <option value={5}>WEEK 5</option>
          <option value={6}>WEEK 6</option>
          <option value={7}>WEEK 7</option>
          <option value={8}>WEEK 8</option>
          <option value={9}>WEEK 9</option>
          <option value={10}>WEEK 10</option>
          <option value={11}>WEEK 11</option>
          <option value={12}>WEEK 12</option>
          <option value={13}>WEEK 13</option>
          <option value={14}>WEEK 14</option>
          <option value={15}>WEEK 15</option>
          <option value={16}>WEEK 16</option>
          <option value={17}>WEEK 17</option>
        </Select>
      </FormControl>
      <SeasonGameList games={games} loading={loading} />
    </Box>
  );
};
