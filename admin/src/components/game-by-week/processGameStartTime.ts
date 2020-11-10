import { DAYS } from "./date-format";
import parseDateTimeLocal from "../../utils/parseDateTimeLocal";

const getDisplayDateString = (dateObj: Date): string => {
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

function getPickWindowInfo(dateObj: Date): PickWindowInfoType {
  // Code to check that date and dayOfWeek are valid left as an exercise ;)
  const PickWindowDateObj = new Date(dateObj.getFullYear(), dateObj.getMonth());

  let dayOfWeek = 0; // Sunday
  let hours = 13; // 1pm

  if (dateObj.getDay() === 4) {
    // if Thursday, set next Thursday 6pm
    dayOfWeek = 4; // Thursday
    hours = 18; // 6pm
  }

  // set day pick window closes
  PickWindowDateObj.setDate(
    dateObj.getDate() - ((7 - dayOfWeek + dateObj.getDay() + 1) % 7) + 1
  );

  // set time pick window closes
  PickWindowDateObj.setHours(hours);

  if (Date.now() < PickWindowDateObj.valueOf()) {
    const pickWindowString = getDisplayDateString(PickWindowDateObj);
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

export default (dateTimeLocal: string): ProcessGameTimeType => {
  // datetimelocal is format YYYY-MM-DDTHh:Dd
  const dateObj = parseDateTimeLocal(dateTimeLocal);
  const displayDateString = getDisplayDateString(dateObj);
  const pickWindowInfo = getPickWindowInfo(dateObj);
  return {
    gameStartTimeString: displayDateString,
    ...pickWindowInfo,
  };
};
