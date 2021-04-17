import { LOGIN } from "../types";

const handlers = {
  [LOGIN]: (state, { payload }) => ({ ...payload }),
  DEFAULT: state => state,
}

export const loginReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;

  return handle(state, action);
}