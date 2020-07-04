import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import todo from "./todo";
import task from "./task";
import currentSession from "./session";

export default combineReducers({
  alert,
  auth,
  profile,
  todo,
  task,
  currentSession,
});
