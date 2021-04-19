import { getCookieValue } from "../../helpers";
import { LOGIN } from "../actionTypes";

const logined = getCookieValue('logined');
const initialState = {
  status: logined,
  token: logined ? getCookieValue('token') : '',
}

export default function loginReducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
