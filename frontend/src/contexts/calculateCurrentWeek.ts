const calculateCurrentWeek = (kickoffMs: number): number => {
  // week changes on Thursday, but currentWeek changes on Monday @ midnight
  const currentDateObj = new Date();
  const diff = (currentDateObj.getTime() - kickoffMs) / 1000;
  const weeksDiff = diff / (60 * 60 * 24 * 7);
  let weeks = Math.ceil(weeksDiff);
  // show next week if Tue or Wed
  if (
    currentDateObj.getDay() === 2 ||
    currentDateObj.getDay() === 3
  )
    weeks = weeks + 1;
  if (weeks > 0 && weeks <= 22) return weeks;
  if (weeks === 23) return 22; // skipping pro bowl week
  return 24; // default case
};

export default calculateCurrentWeek;
