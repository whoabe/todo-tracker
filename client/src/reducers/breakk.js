import { SET_CURRENT_BREAK, REMOVE_CURRENT_BREAK } from "../actions/types";

const initialState = null;

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_BREAK:
      return payload;
    case REMOVE_CURRENT_BREAK:
      return initialState;
    default:
      return state;
  }
}
