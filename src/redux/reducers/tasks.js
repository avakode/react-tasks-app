import { FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS, TASK_EDITED, TASK_ADDED } from "../actionTypes";

const initialState = {
  tasks: [],
  count: 0,
  loading: false,
  taskAdded: false,
  taskEdited: false,
};

export default function tasksReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_TASKS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_TASKS_SUCCESS: {
      return {
        ...state,
        tasks: action.payload.tasks,
        count: action.payload.total_task_count,
        loading: false,
        taskAdded: false,
        taskEdited: false,
      };
    }
    case TASK_ADDED: {
      return {
        ...state,
        taskAdded: true,
      };
    }
    case TASK_EDITED: {
      return {
        ...state,
        taskEdited: true,
      };
    }
    default:
      return state;
  }
}
