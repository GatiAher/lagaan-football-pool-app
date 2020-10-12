import { DAYS } from "./constants/date-format";

interface IDate {
  dateString: string;
  isOver: boolean;
}

export default (miliseconds: number): IDate => {
  const isOver = Date.now() > miliseconds;
  const dateObj = new Date(miliseconds);
  const day = DAYS.get(dateObj.getDay());
  const yearRegex = /(\/[^/]+$)/;
  const date = dateObj.toLocaleDateString().replace(yearRegex, "");
  const secondsRegex = /(:[\d]+ )/;
  const time = dateObj.toLocaleTimeString().replace(secondsRegex, " ");
  return {
    dateString: `${day} ${date}, ${time}`,
    isOver,
  };
};
