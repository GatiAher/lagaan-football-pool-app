const calculateCurrentWeek = (kickoffMs: number): number => {
  // week changes on Thursday, but currentWeek changes on Sun  @ 1pm
  const currentDateObj = new Date();
  const diff = (currentDateObj.getTime() - kickoffMs) / 1000;
  const weeksDiff = diff / (60 * 60 * 24 * 7);
  let weeks = Math.ceil(weeksDiff);
  // show next week if Sun after 1pm, Mon, Tue, or Wed
  if (
    (currentDateObj.getDay() === 0 && currentDateObj.getHours() >= 13) ||
    currentDateObj.getDay() === 1 ||
    currentDateObj.getDay() === 2 ||
    currentDateObj.getDay() === 3
  )
    weeks = weeks + 1;
  if (weeks > 0 && weeks <= 21) return weeks;
  if (weeks === 22) return 21; // skipping pro bowl week
  return 23; // default case
};

export default calculateCurrentWeek;
