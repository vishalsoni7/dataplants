import { State, Action } from "./types";

export const initialState: State = {
  schedule: [],
  input: "",
  error: null,
  modal: false,
};

export const reducer = (state: State = initialState, action: Action): State => {
  const { type, payload } = action;

  switch (type) {
    case "FETCH_DATA":
      return {
        ...state,
        schedule: payload,
      };

    case "FETCHING_DATA_FAILURE":
      return {
        ...state,
        error: payload,
      };

    case "HANDLE_ADD_SCHEDULE":
      return {
        ...state,
        schedule: [...state.schedule, payload],
      };

    case "HANDLE_MODAL":
      return {
        ...state,
        modal: !state.modal,
      };

    case "DELETE_SCHEDULE":
      const updatedSchedule = state.schedule.filter(
        (data) => data._id !== payload._id
      );

      return {
        ...state,
        schedule: updatedSchedule,
      };

    case "HANDLE_UPDATE":
      return {
        ...state,
        schedule: state.schedule.map((item) =>
          item._id === payload._id ? { ...item, ...payload } : item
        ),
      };

    case "SEARCH_BY_TITLE":
      if (!payload?.title?.trim()) {
        return {
          ...state,
          schedule: state.schedule,
        };
      }

      const filteredSchedules = state.schedule.filter((schedule) =>
        schedule.title.toLowerCase().includes(payload?.title?.toLowerCase())
      );

      return {
        ...state,
        schedule: filteredSchedules,
      };

    case "HANDLE_INPUT":
      return {
        ...state,
        input: action.payload,
      };

    default:
      return state;
  }
};
