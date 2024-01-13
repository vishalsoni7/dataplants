import React, { createContext, useEffect, useReducer, useState } from "react";
import { reducer, initialState } from "../Utils/reducer";
import { ScheduleContextProps, ScheduleProviderProps } from "../Utils/types";

import { fetchData } from "../Utils/actions";

export const ScheduleContext = createContext<ScheduleContextProps | null>(null);

export const ScheduleProvider: React.FC<ScheduleProviderProps> = ({
  children,
}) => {
  const [scheduleState, dispatch] = useReducer(reducer, initialState);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  const values: ScheduleContextProps = {
    selectedId,
    setSelectedId,
    scheduleState,
    dispatch,
  };

  return (
    <ScheduleContext.Provider value={values}>
      {children}
    </ScheduleContext.Provider>
  );
};
