export const getCurrentWeek = (kickOffDate: number): number => {
  const kickOffDateObj = new Date(kickOffDate);
  const currentDateObj = new Date();
  const diff = (currentDateObj.getTime() - kickOffDateObj.getTime()) / 1000;
  const weeks = diff / (60 * 60 * 24 * 7);
  return Math.abs(Math.round(weeks));
};
