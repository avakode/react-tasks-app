import React, { useReducer } from 'react';
import { FETCH_TASKS, ADD_TASK, SHOW_LOADER, EDIT_TASK } from '../types';
import { TasksContext } from './tasksContext';
import { TasksReducer } from './tasksReducer';
import axios from 'axios';
import { API_URL, developer } from '../../constants';

export const TasksState = ({ children }) => {
  const initialState = {
    tasks: [],
    count: 0,
    loading: false,
  }
  const [state, dispatch] = useReducer(TasksReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchTasks = async (requestData) => {
    showLoader();

    const page = requestData.page ? `&page=${requestData.page}` : '';
    const sortField = requestData.field ? `&sort_field=${requestData.field}` : '';
    const sortDirection = requestData.direction ? `&sort_direction=${requestData.direction}` : '';
    const requestUrl = `${API_URL}/?${developer}${page}${sortField}${sortDirection}`;
    const res = await axios.get(requestUrl);
    const payload = res.data.message;

    dispatch({ type: FETCH_TASKS, payload })
  }

  const addTask = async (username, email, text) => {
    const form = new FormData();

    form.append('username', username);
    form.append('email', email);
    form.append('text', text);

    try {
      const res = await axios({
        method: "post",
        url: `${API_URL}/create?${developer}`,
        data: form,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data; charset=utf-8'
        },
      });

      const payload = {
        ...{username, email, text},
        id: res.data.message.id,
        status: res.data.message.status
      }

      dispatch({ type: ADD_TASK, payload })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  const editTask = async (requestData) => {
    const form = new FormData();

    form.append('status', requestData.status);

    if (requestData.text) {
      form.append('text', requestData.text);
    }

    form.append('token', requestData.token);

    try {
      const res = await axios({
        method: "post",
        url: `${API_URL}/edit/${requestData.id}?${developer}`,
        data: form,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        },
      });

      const payload = {
        status: res.data
      }

      dispatch({ type: EDIT_TASK, payload })
      return res;
    } catch (e) {
      throw new Error(e.message)
    }
  }

  return (
    <TasksContext.Provider value={{
      showLoader, addTask, fetchTasks, editTask,
      loading: state.loading,
      tasks: state.tasks,
      count: state.count
    }}>
      {children}
    </TasksContext.Provider>
  );
}