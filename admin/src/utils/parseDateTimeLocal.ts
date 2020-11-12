const parseDateTimeLocal = (dateTimeLocal: string): Date => {
  // datetimelocal is in format YYYY-MM-DD hh:mm _M
  const [dateString, timeString, AMPM] = dateTimeLocal.split(" ");
  // Process date
  const [yearString, monthString, dayString] = dateString.split("-");
  const year = parseInt(yearString, 10);
  const month = parseInt(monthString, 10);
  const monthIndex = month - 1; // required by Date()
  const day = parseInt(dayString, 10);

  // Process time
  const [hourString, minuteString] = timeString.split(":");
  let hour = parseInt(hourString, 10);
  if (AMPM === "PM") {
    hour = hour + 12;
  }
  const minute = parseInt(minuteString, 10);

  // get dateObj
  const dateObj = new Date(year, monthIndex, day, hour, minute);

  return dateObj;
};

export default parseDateTimeLocal;
