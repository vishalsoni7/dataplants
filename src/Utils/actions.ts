import axios from "axios";

const baseUrl =
  "https://b48a27e3-f93a-4b42-a2b3-18d6d6248294-00-2asqk9wo9g4wi.sisko.replit.dev/schedules";

// export const handleModal = (dispatch: any) => {
//   // @ts-ignore
//   dispatch({ type: "HANDLE_MODAL", payload: !payload });
// };

export const fetchData = async (dispatch: any) => {
  try {
    const data = await axios.get(baseUrl);
    // console.log(data.data);
    dispatch({ type: "FETCH_DATA", payload: data.data });
  } catch (error) {
    console.log("Failed to fetch data", error);
    dispatch({ type: "FETCHING_DATA_FAILURE", payload: error });
  }
};

export const deleteSchedule = async (dispatch: any, id: string) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    dispatch({ type: "DELETE_SCHEDULE", payload: response.data });
  } catch (error) {
    console.error("Failed to delete schedule", error);
  }
};

export const searchByTitle = async (dispatch: any, title: string) => {
  try {
    dispatch({ type: "SEARCH_SCHEDULES_BY_TITLE_REQUEST" });

    const response = await axios.get(`${baseUrl}/search`, {
      params: { title },
    });
    console.log(response);
    dispatch({
      type: "SEARCH_SCHEDULES_BY_TITLE_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    console.warn("Error schedules by title", error);
    dispatch({
      type: "SEARCH_SCHEDULES_BY_TITLE_FAILURE",
      // @ts-ignore
      payload: error.message,
    });
  }
};

// const debounce = (callback: any, delay: number) => {
//     let timer: any;

//     return (...args: any) => {
//       if (timer) clearTimeout(timer);
//       timer = setTimeout(() => callback(...args), delay);
//     };
//   };
