import { SET_TASK, REMOVE_TASK, EDIT_TASK } from "../actions/types";

const initialState = null;

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_TASK:
      return payload;
    case REMOVE_TASK:
      return initialState;
    case EDIT_TASK:
      if (state && state._id === payload.todoId) {
        return payload.data;
      } else {
        return state;
      }
    default:
      return state;
  }
}
