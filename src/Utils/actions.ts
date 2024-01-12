import axios from "axios";
import { ActionProp, DisableProp, Schedule } from "./types";
import { Dispatch } from "react";

const baseUrl =
  "https://b48a27e3-f93a-4b42-a2b3-18d6d6248294-00-2asqk9wo9g4wi.sisko.replit.dev/schedules";

export const isFieldsEmpty = (input: DisableProp) => {
  return (
    Object.values(input).every((value) => value === "") ||
    !input.title ||
    !input.description ||
    !input.time
  );
};

export const handleModal = (dispatch: Dispatch<ActionProp>) => {
  dispatch({ type: "HANDLE_MODAL" });
};

export const fetchData = async (dispatch: Dispatch<ActionProp>) => {
  try {
    const data = await axios.get(baseUrl);
    dispatch({ type: "FETCH_DATA", payload: data.data });
  } catch (error) {
    console.error("Failed to fetch data", error);
    dispatch({ type: "FETCHING_DATA_FAILURE", payload: error });
  }
};

export const addSchedule = async (
  dispatch: Dispatch<ActionProp>,
  input: Omit<Schedule, "_id">
) => {
  try {
    const response = await axios.post(baseUrl, input);
    dispatch({ type: "HANDLE_ADD_SCHEDULE", payload: response.data });
  } catch (error) {
    console.error("Failed to adding data", error);
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
