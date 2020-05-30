import { SET_TASK, REMOVE_TASK } from "../actions/types";

const initialState = {
  task: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_TASK:
      return {
        ...state,
        task: payload,
      };
    case REMOVE_TASK:
      return {
        ...state,
        task: null,
      };
    default:
      return state;
  }
}
