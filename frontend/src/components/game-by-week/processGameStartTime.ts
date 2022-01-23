import { DAYS } from "./date-format";
import parseDateTimeLocal from "../../utils/parseDateTimeLocal";

export const getDisplayDateString = (dateObj: Date): string => {
  // get 12-hour time
  const hour = dateObj.getHours();
  let AMPM = "am";
  let hour12 = hour;
  if (hour > 12) {
    hour12 = hour - 12;
    AMPM = "pm";
  }
  // format minute
  const minute = dateObj.getMinutes();
  const minuteString = ("00" + minute).slice(-2);
  const month = dateObj.getMonth() + 1; // Jan = 0
  const date = dateObj.getDate();
  // get dayName
  const dayOfWeekName = DAYS.get(dateObj.getDay());
  return `${dayOfWeekName}, ${month}/${date}, ${hour12}:${minuteString}${AMPM}`;
};

type PickWindowInfoType = {
  gamePickWindowString: string;
  gameIsPickWindowOpen: boolean;
};

function getPickWindowInfo(
  pickWindowDateObj: Date,
): PickWindowInfoType {
  if (Date.now() < pickWindowDateObj.valueOf()) {
    const pickWindowString = getDisplayDateString(pickWindowDateObj);
    return {
      gamePickWindowString: `open until ${pickWindowString}`,
      gameIsPickWindowOpen: true,
    };
  }
  return {
    gamePickWindowString: `CLOSED`,
    gameIsPickWindowOpen: false,
  };
}

type ProcessGameTimeType = PickWindowInfoType & {
  gameStartTimeString: string;
};

export default (
  startTime: string,
  pickWindowTime: string,
): ProcessGameTimeType => {
  // datetimelocal is format YYYY-MM-DDTHh:Dd
  const startDateObj = parseDateTimeLocal(startTime);
  const displayDateString = getDisplayDateString(startDateObj);

  const pickWindowObj = parseDateTimeLocal(pickWindowTime);
  const pickWindowInfo = getPickWindowInfo(pickWindowObj);
  return {
    gameStartTimeString: displayDateString,
    ...pickWindowInfo,
  };
};