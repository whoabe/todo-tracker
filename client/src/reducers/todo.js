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
      return {
        ...state,
        todos: [payload, ...state.todos],
        loading: false,
      };
    case START_SESSION:
      // find the correct todo and add a new session to todo.sessions
      return {
        ...state,
        todos: state.todos.map(
          (todo) => {
            if (todo._id === payload.todoId) {
              const sessions = [...todo.sessions, payload.data];
              return { ...todo, sessions };
            } else {
              return todo;
            }
          }
          // todo._id === payload.todoId
          //   ? {
          //       [todo]: {
          //         ...state[todo],
          //         [sessions]: [...state[todo][sessions], payload.data],
          //       },
          //     }
          //   : todo
          // ISSUE COULD HAVE TO DO W THE INITAL STATE? FIGURE OUT WHAT DATA STRUCTURE YOU WANT FOR TODO AND SESSIONS ~ OBJECT OR ARRAYS?
        ),
      };
    case COMPLETE_SESSION:
      const todoIndex = state.todos.findIndex(
        (todo) => todo._id === payload.todoId
      );
      const matchedTodo = state.todos[todoIndex];
      const sessionIndex = matchedTodo.sessions.findIndex(
        (session) => session._id === payload.sessionId
      );
      const updatedSessions = matchedTodo.sessions;
      updatedSessions[sessionIndex] = payload.data;
      const updatedTodos = state.todos;
      updatedTodos[todoIndex].sessions = updatedSessions;
      if (sessionIndex !== -1) {
        // return {
        //   ...state,
        //   todos: {
        //     ...state.todos,
        //     sessions: {
        //       ...state.todos.sessions,
        //       updatedSessions,
        //     },
        //   },
        // };

        return {
          ...state,
          todos: updatedTodos,
        };
      }
      return state;
    // find the correct todo and correct session and then replace it
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
