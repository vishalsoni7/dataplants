export const initialState = {
  schedule: [],
  input: "",
  loading: false,
  error: null,
  modal: false,
};

export const reducer = (state = initialState, action: any) => {
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

    case "HANDLE_LOADING":
      return {
        ...state,
        loading: payload,
      };

    case "HANDLE_MODAL":
      return {
        ...state,
        modal: payload,
      };

    case "DELETE_SCHEDULE":
      const updatedSchedule = state.schedule.filter(
        // @ts-ignore
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
