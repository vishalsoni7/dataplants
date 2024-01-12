import { State, Action } from "./types";

export const initialState: State = {
  schedule: [],
  input: "",
  loading: false,
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

    case "HANDLE_LOADING":
      return {
        ...state,
        loading: payload,
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

    case "SEARCH_SCHEDULES_BY_TITLE_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "SEARCH_SCHEDULES_BY_TITLE_SUCCESS":
      return {
        ...state,
        loading: false,
        schedule: payload,
      };

    case "SEARCH_SCHEDULES_BY_TITLE_FAILURE":
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case "SEARCH_SCHEDULES_BY_TITLE":
      return {
        ...state,
        input: payload,
      };

    default:
      return state;
  }
};
