import { SET_CURRENT_BREAK, REMOVE_CURRENT_BREAK } from "./types";
// import { setAlert } from "../actions/alert";

// Set breakk
export const setCurrentBreak = (breakk) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_BREAK,
    payload: breakk,
  });
  // dispatch(setAlert("Task Set", "success"));
};
// Remove breakk
export const removeCurrentBreak = () => (dispatch) => {
  dispatch({
    type: REMOVE_CURRENT_BREAK,
  });
  // dispatch(setAlert("Task Removed", "success"));
};
