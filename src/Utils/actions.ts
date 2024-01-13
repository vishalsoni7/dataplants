import axios from "axios";
import { ActionProp, DisableProp, Schedule } from "./types";
import { Dispatch } from "react";

const baseUrl = "https://dataplant.vercel.app";

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

export const updateSchedule = async (
  dispatch: Dispatch<ActionProp>,
  id: string,
  updatedData: Schedule
) => {
  try {
    const response = await axios.patch(`${baseUrl}/${id}`, updatedData);
    dispatch({ type: "HANDLE_UPDATE", payload: response.data });
  } catch (error) {
    console.error("Failed to update data", error);
  }
};

export const deleteSchedule = async (
  dispatch: Dispatch<ActionProp>,
  id: string
) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    dispatch({ type: "DELETE_SCHEDULE", payload: response.data });
  } catch (error) {
    console.error("Failed to delete schedule", error);
  }
};

export const searchByTitle = async (
  dispatch: Dispatch<ActionProp>,
  title: string
) => {
  try {
    const response = await axios.get(`${baseUrl}/search`, {
      params: { title },
    });

    dispatch({
      type: "SEARCH_BY_TITLE",
      payload: response?.data,
    });
  } catch (error) {
    console.warn("Error schedules by title", error);
  }
};

const debounce = (callback: any, delay: number) => {
  let timer: any;

  return (...args: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};

export const searchWithDebounce = debounce(
  (dispatch: Dispatch<ActionProp>, title: string) => {
    searchByTitle(dispatch, title);
  },
  500
);

export const handleSearchChange = (
  dispatch: Dispatch<ActionProp>,
  newSearchValue: string
) => {
  dispatch({
    type: "HANDLE_INPUT",
    payload: newSearchValue,
  });

  if (newSearchValue.trim() === "") {
    fetchData(dispatch);
  } else {
    searchWithDebounce(dispatch, newSearchValue);
  }
};
