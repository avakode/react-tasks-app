import { CHANGE_FILTERS } from "../types";

const handlers = {
  [CHANGE_FILTERS]: (state, { payload }) => ({ ...payload,}),
  DEFAULT: state => state,
}

export const filtersReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;

  return handle(state, action);
}