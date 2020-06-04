import {
  GET_TODOS,
  GET_TODO,
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  START_SESSION,
  COMPLETE_SESSION,
  TODO_ERROR,
} from "../actions/types";

const initialState = {
  todos: [],
  todo: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TODOS:
      return {
        ...state,
        todos: payload,
        loading: false,
      };
    case GET_TODO:
      return {
        ...state,
        todo: payload,
        loading: false,
      };
    case ADD_TODO:
    case START_SESSION:
    case COMPLETE_SESSION:
      return {
        ...state,
        todos: [payload, ...state.todos],
        loading: false,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== payload),
        loading: false,
      };
    case TOGGLE_TODO:
      return state;
    case TODO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
