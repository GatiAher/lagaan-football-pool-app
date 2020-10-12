import { KICKOFF } from "./constants/week";

const getCurrentWeek = (): number => {
  const currentDateObj = new Date();
  const diff = (currentDateObj.getTime() - KICKOFF) / 1000;
  const weeksDiff = diff / (60 * 60 * 24 * 7);
  const weeks = Math.ceil(weeksDiff);
  // show next week if Tuesday or Wednesday
  if (currentDateObj.getDay() === 2 || currentDateObj.getDay() === 3)
    return weeks + 1;
  if (weeks >= 0 && weeks <= 17) return weeks;
  return 1;
};

export default getCurrentWeek;
