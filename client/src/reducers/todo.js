import {
  GET_TODOS,
  GET_TODO,
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  START_SESSION,
  COMPLETE_SESSION,
  DELETE_SESSION,
  TODO_ERROR,
  EDIT_TODO,
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
      return {
        ...state,
        todos: [payload, ...state.todos],
        loading: false,
      };
    case START_SESSION:
      // find the correct todo and add a new session to todo.sessions
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id === payload.todoId) {
            const sessions = [...todo.sessions, payload.data];
            return { ...todo, sessions };
          } else {
            return todo;
          }
        }),
      };
    case COMPLETE_SESSION:
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id !== payload.todoId) {
            return todo;
          }
          return {
            ...todo,
            ...payload.data,
          };
        }),
      };

    case DELETE_SESSION:
      const todoIndex2 = state.todos.findIndex(
        (todo) => todo._id === payload.todoId
      );
      const matchedTodo2 = state.todos[todoIndex2];
      const updatedSessions2 = matchedTodo2.sessions.filter(
        (session) => session._id !== payload.sessionId
      );
      const updatedTodos2 = state.todos;
      updatedTodos2[todoIndex2].sessions = updatedSessions2;
      return {
        ...state,
        todos: updatedTodos2,
      };
    // get the correct todo
    // filter out the sesions
    // update state w updated sessions and updated todos
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
