import { ADD_TASK, EDIT_TASK, FETCH_TASKS, SHOW_LOADER } from "../types";

const handlers = {
  [SHOW_LOADER]: state => ({...state, loading: true}),
  [ADD_TASK]: (state, {payload}) => ({
    ...state,
    tasks: [...state.tasks, payload],
  }),
  [EDIT_TASK]: (state, {payload}) => ({ ...state, status: payload }),
  [FETCH_TASKS]: (state, {payload}) => ({
    ...state,
    tasks: payload.tasks,
    count: payload.total_task_count,
    loading: false}),
  DEFAULT: state => state,
}

export const TasksReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;

  return handle(state, action);
}