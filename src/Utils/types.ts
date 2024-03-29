import React, { ReactNode } from "react";

export type ScheduleProviderProps = {
  children: ReactNode;
};

export type ScheduleContextProps = {
  selectedId: null | string;
  setSelectedId: React.Dispatch<React.SetStateAction<null | string>>;
  scheduleState: State;
  dispatch: React.Dispatch<Action>;
};

export type Schedule = {
  _id: string;
  title: string;
  description: string;
  subject: string;
  frequency: string;
  repeat: string;
  time: string;
};

export type State = {
  schedule: Schedule[];
  input: string;
  error: null | string;
  modal: boolean;
};

export type Action = {
  type: string;
  payload?: any;
};

export type ModalProps = {
  id: string | null;
};

export type ScheduleTableProps = {
  scheduleState: {
    schedule: Schedule[];
  };
  setSelectedId: (id: string) => void;
  handleModal: (dispatch: any) => void;
  deleteSchedule: (dispatch: any, id: string) => void;
  dispatch: () => void;
};

export type DayProp = {
  name: string;
  value: string;
  charAt?: (() => string) | undefined;
};

export type DisableProp = {
  title: string;
  description: string;
  time: string;
};

export type ActionProp = {
  type: string;
  payload?: any;
  input?: Schedule;
};
