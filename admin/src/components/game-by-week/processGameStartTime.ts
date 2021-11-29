import { DAYS, DAYSTONUM } from "./date-format";
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

type PickWindowDayAndHour = {
  closeDay: number;
  closeHour: number;
};

function getDefaultPickWindowDayAndHour(dateObj: Date): PickWindowDayAndHour {
  let closeDay = dateObj.getDay() || 0; // Sunday
  let closeHour = 13; // 1pm
  if (closeDay === 4) {
    // if Thursday, set next Thursday 6pm
    closeHour = 18; // 6pm
    // if Thanksgiving (4th Thursday of November)
    const occurance = Math.ceil(new Date().getDate() / 7);
    if (occurance === 4 && dateObj.getMonth() === 10) {
      closeHour = 10; // 10am
    }
  } else if (closeDay === 1) {
    // if Monday, set Sunday 1pm
    closeDay = 0;
    closeHour = 13;
  }
  return {
    closeDay,
    closeHour,
  };
}

function getPickWindowDayAndHour(
  dateObj: Date,
  overrideDay?: string,
  overrideHour?: number
): PickWindowDayAndHour {
  // expect overrideDay to be Sun, Mon, Tue, Wed, Thu, Fri, Sat
  // expect overrideHour to be number in range 1-23
  let { closeDay, closeHour } = getDefaultPickWindowDayAndHour(dateObj);
  if (
    overrideDay &&
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].includes(overrideDay)
  ) {
    closeDay = DAYSTONUM.get(overrideDay) || 0;
  }
  if (overrideHour && overrideHour >= 1 && overrideHour <= 23) {
    closeHour = overrideHour;
  }
  return { closeDay, closeHour };
}

type PickWindowInfoType = {
  gamePickWindowString: string;
  gameIsPickWindowOpen: boolean;
};

function getPickWindowInfo(
  dateObj: Date,
  closeDay: number,
  closeHour: number
): PickWindowInfoType {
  const PickWindowDateObj = new Date(dateObj.getFullYear(), dateObj.getMonth());
  // set day pick window closes
  if (closeDay === dateObj.getDay()) {
    // same day
    PickWindowDateObj.setDate(dateObj.getDate());
  } else if (closeDay === dateObj.getDay() - 1) {
    // Monday game, closes on Sunday
    PickWindowDateObj.setDate(dateObj.getDate() - 1);
  } else {
    // next occurance of that day
    PickWindowDateObj.setDate(
      dateObj.getDate() + (closeDay + ((7 - dateObj.getDay()) % 7))
    );
  }
  // set time pick window closes
  PickWindowDateObj.setHours(closeHour);
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

export default (
  dateTimeLocal: string,
  pickWindowDay?: string,
  pickWindowHour?: number
): ProcessGameTimeType => {
  // datetimelocal is format YYYY-MM-DDTHh:Dd
  const dateObj = parseDateTimeLocal(dateTimeLocal);
  const displayDateString = getDisplayDateString(dateObj);
  const { closeDay, closeHour } = getPickWindowDayAndHour(
    dateObj,
    pickWindowDay,
    pickWindowHour
  );
  const pickWindowInfo = getPickWindowInfo(dateObj, closeDay, closeHour);
  return {
    gameStartTimeString: displayDateString,
    ...pickWindowInfo,
  };
};
