import { SHOW_MODAL, HIDE_MODAL } from "../actionTypes";

const initialState = {
  visible: false,
};

export default function modalReducer (state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL: {
      return {
        ...action.payload,
        visible: true,
      }
    }
    case HIDE_MODAL: {
      return {
        ...state,
        visible: false,
      };
    }
    default:
      return state;
  }
}
