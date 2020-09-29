import { DAYS } from "./constants/date-format";

interface IDate {
  day?: string;
  date?: string;
  time?: string;
}

const dateParser = (miliseconds: number): IDate => {
  const dateObj = new Date(miliseconds);
  const day = DAYS.get(dateObj.getDay());
  const yearRegex = /(\/[^/]+$)/;
  const date = dateObj.toLocaleDateString().replace(yearRegex, "");
  const secondsRegex = /(:[\d]+ )/;
  const time = dateObj.toLocaleTimeString().replace(secondsRegex, " ");
  return {
    day,
    date,
    time,
  };
};

export default dateParser;
