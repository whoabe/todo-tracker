import { SET_TASK, REMOVE_TASK } from "./types";
// import { setAlert } from "../actions/alert";

// Set Task
export const setTask = (task) => (dispatch) => {
  dispatch({
    type: SET_TASK,
    payload: task,
  });
  // dispatch(setAlert("Task Set", "success"));
};
// Remove Task
export const removeTask = () => (dispatch) => {
  dispatch({
    type: REMOVE_TASK,
  });
  // dispatch(setAlert("Task Removed", "success"));
};
