import { SET_SESSION, REMOVE_SESSION } from "./types";
// import { setAlert } from "../actions/alert";

// Set Task
export const setSession = (session) => (dispatch) => {
  dispatch({
    type: SET_SESSION,
    payload: session,
  });
  // dispatch(setAlert("Task Set", "success"));
};
// Remove Task
export const removeSession = () => (dispatch) => {
  dispatch({
    type: REMOVE_SESSION,
  });
  // dispatch(setAlert("Task Removed", "success"));
};
