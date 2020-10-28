export const KICKOFF = new Date(2020, 8, 10).valueOf(); // 2020, Sept 10

const getCurrentWeek = (): number => {
  // week changes on Thursday, but currentWeek changes on Sun  @ 1pm
  const currentDateObj = new Date();
  const diff = (currentDateObj.getTime() - KICKOFF) / 1000;
  const weeksDiff = diff / (60 * 60 * 24 * 7);
  const weeks = Math.ceil(weeksDiff);
  // show next week if Sun after 1pm, Mon, Tue, or Wed
  if (
    (currentDateObj.getDay() === 0 && currentDateObj.getHours() >= 13) ||
    currentDateObj.getDay() === 1 ||
    currentDateObj.getDay() === 2 ||
    currentDateObj.getDay() === 3
  )
    return weeks + 1;
  if (weeks >= 0 && weeks <= 17) return weeks;
  return 1;
};

export default getCurrentWeek;
