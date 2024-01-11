import { createContext, useEffect, useReducer } from "react";
import { reducer, initialState } from "../Utils/reducer";

import { fetchData } from "../Utils/actions";

type ScheduleContextProvierType = {
  children: React.ReactNode;
};

export const ScheduleContext = createContext(null);

export const ScheduleProvider = ({ children }: ScheduleContextProvierType) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  const values: any = { state, dispatch };

  return (
    <ScheduleContext.Provider value={values}>
      {children}
    </ScheduleContext.Provider>
  );
};
