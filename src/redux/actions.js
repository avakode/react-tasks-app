import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  TASK_EDITED, SHOW_ALERT,
  HIDE_ALERT,
  TASK_ADDED,
  LOGIN,
  HIDE_MODAL,
  SHOW_MODAL,
  CHANGE_FILTERS } from "./actionTypes";

export const fetchTasksRequest = () => ({ type: FETCH_TASKS_REQUEST, });

export const fetchTasksSuccess = res => ({ type: FETCH_TASKS_SUCCESS, payload: res.data.message });

export const taskAdded = () => ({ type: TASK_ADDED });

export const taskEdited = () => ({ type: TASK_EDITED });

export const showAlert = (text, type = 'warning') => {
  return {
    type: SHOW_ALERT,
    payload: { text, type },
  }
}

export const hideAlert = () => ({ type: HIDE_ALERT });

export const loginRequest = res => {
  const payload = {
    status: res.data.status === 'ok',
    token: res.data.message.token,
  }

  return { type: LOGIN, payload }
}

export const showModal = (task) => {
  return {
    type: SHOW_MODAL,
    payload: task,
  };
}

export const hideModal = () => ({ type: HIDE_MODAL });

export const filtersChange = (filters) => {
  return {
    type: CHANGE_FILTERS,
    payload: filters,
  };
}