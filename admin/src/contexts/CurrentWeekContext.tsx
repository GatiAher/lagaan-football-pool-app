import React, { createContext, useContext, useEffect, useState } from "react";

import api from "../api";

import parseDateTimeLocal from "../utils/parseDateTimeLocal";
import calculateCurrentWeek from "./calculateCurrentWeek";

export type CurrentWeekContextType = {
  currentWeek: number;
};

export const CurrentWeekContext = createContext<CurrentWeekContextType>({
  currentWeek: 1,
});

export const CurrentWeekProvider: React.FC = ({ children }) => {
  const [currentWeek, setCurrentWeek] = useState(1);

  useEffect(() => {
    api.info.getKickOffDate().then((res) => {
      const currentWeekDateObj = parseDateTimeLocal(res.data.startTime);
      const year = currentWeekDateObj.getFullYear();
      const monthIdx = currentWeekDateObj.getMonth();
      const dayOfMonth = currentWeekDateObj.getDate();
      const currentWeekValue = calculateCurrentWeek(
        new Date(year, monthIdx, dayOfMonth).valueOf()
      );
      setCurrentWeek(currentWeekValue);
    });
  }, []);

  const { Provider } = CurrentWeekContext;
  return <Provider value={{ currentWeek }}>{children}</Provider>;
};

export const useCurrentWeek = () => useContext(CurrentWeekContext);
