import React, { createContext, useEffect, useReducer } from "react";
import { reducer, initialState } from "../Utils/reducer";
import { ScheduleContextProps, ScheduleProviderProps } from "../Utils/types";

import { fetchData } from "../Utils/actions";

export const ScheduleContext = createContext<ScheduleContextProps | null>(null);

export const ScheduleProvider: React.FC<ScheduleProviderProps> = ({
  children,
}) => {
  const [scheduleState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  const values: ScheduleContextProps = { scheduleState, dispatch };

  return (
    <ScheduleContext.Provider value={values}>
      {children}
    </ScheduleContext.Provider>
  );
};
