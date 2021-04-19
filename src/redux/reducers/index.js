import { combineReducers } from "redux";
import tasks from "./tasks";
import alert from "./alert";
import login from "./login";
import modal from "./modal";
import filters from "./filters";

export default combineReducers({ tasks, alert, login, modal, filters });