import { HIDE_ALERT, SHOW_ALERT } from "../actionTypes";

const initialState = {
  visible: false,
};

export default function alertReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT: {
      return {
        ...action.payload,
        visible: true,
      };
    }
    case HIDE_ALERT: {
      return {
        ...state,
        visible: false,
      };
    }
    default:
      return state;
  }
}