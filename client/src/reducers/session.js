import { SET_SESSION, REMOVE_SESSION } from "../actions/types";

const initialState = null;

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_SESSION:
      return payload;
    case REMOVE_SESSION:
      return initialState;
    default:
      return state;
  }
}
