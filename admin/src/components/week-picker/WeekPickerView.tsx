import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(2),
      minWidth: 240,
    },
  })
);

type WeekPickerViewProps = {
  week: number;
  setWeek: (arg0: number) => void;
};

const WeekPickerView = ({ week, setWeek }: WeekPickerViewProps) => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor="outlined-age-native-simple">Week</InputLabel>
      <Select
        native
        value={week}
        onChange={(e) => {
          setWeek(parseInt(e.target.value as string, 10) as number);
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
        <option value={18}>WILDCARD</option>
        <option value={19}>DIVISIONAL</option>
        <option value={20}>CHAMPIONSHIP</option>
        <option value={21}>SUPERBOWL</option>
        <option value={23}></option>
      </Select>
    </FormControl>
  );
};

export default WeekPickerView;
