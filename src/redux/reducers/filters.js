import { CHANGE_FILTERS } from "../actionTypes";

const initialState = {
  page: 1,
  field: 'id',
  direction: 'desc',
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FILTERS: {
      return {
        ...action.payload,
      }
    }
    default:
      return state;
  }
}
