import api from "../utils/api";
import {
  GET_TODOS,
  GET_TODO,
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  TOGGLE_TODO,
  COMPLETE_SESSION,
  START_SESSION,
  TODO_ERROR,
  SET_SESSION,
  REMOVE_SESSION,
  EDIT_SESSION,
  DELETE_SESSION,
  EDIT_TASK,
  REMOVE_TASK,
  SET_TASK,
  START_BREAK,
  COMPLETE_BREAK,
  EDIT_BREAK,
  DELETE_BREAK,
  SET_CURRENT_BREAK,
  REMOVE_CURRENT_BREAK,
} from "./types";
import { setAlert } from "../actions/alert";

// Get posts
export const getTodos = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/todos/user/${userId}`);

    dispatch({
      type: GET_TODOS,
      payload: res.data,
    });
    if (res.data && res.data.length > 0) {
      dispatch({
        type: SET_TASK,
        payload: res.data[0],
      });
    }
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete todo
export const deleteTodo = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/todos/${id}`);

    dispatch({
      type: DELETE_TODO,
      payload: id,
    });
    dispatch({
      type: REMOVE_TASK,
    });
    if (res.data && res.data.length > 0) {
      dispatch({
        type: SET_TASK,
        payload: res.data[res.data.length - 1],
      });
    }

    dispatch(setAlert("Todo Removed", "success"));
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add todo
export const addTodo = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/todos", formData);

    dispatch({
      type: ADD_TODO,
      payload: res.data,
    });
    dispatch({
      type: SET_TASK,
      payload: res.data,
    });

    dispatch(setAlert("Todo Created", "success"));
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get todo
export const getTodo = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/todos/${id}`);

    dispatch({
      type: GET_TODO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit todo
export const editTodo = (todoId, data) => async (dispatch) => {
  try {
    const res = await api.put(`/todos/${todoId}`, data);

    dispatch({
      type: EDIT_TODO,
      payload: {
        todoId,
        data: res.data,
      },
    });
    dispatch({
      type: EDIT_TASK,
      payload: {
        todoId,
        data: res.data,
      },
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// toggle complete todo
export const toggleTodo = (todoId) => async (dispatch) => {
  try {
    const res = await api.put(`/todos/toggle/${todoId}`);

    dispatch({
      type: TOGGLE_TODO,
      payload: {
        todoId,
        data: res.data,
      },
    });
    dispatch({
      type: REMOVE_TASK,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Start Session
export const startSession = (todoId, data) => async (dispatch) => {
  try {
    const res = await api.post(`/todos/session/${todoId}`, data);
    // adds a session to the todo
    dispatch({
      type: START_SESSION,
      payload: { todoId, data: res.data },
    });
    // sets the current session
    dispatch({
      type: SET_SESSION,
      payload: res.data,
    });
    dispatch(setAlert("Session Started", "success"));
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      // broken
      // payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Complete Session
export const completeSession = (todoId, sessionId, data) => async (
  dispatch
) => {
  try {
    const res = await api.put(`/todos/session/${todoId}/${sessionId}`, data);
    dispatch({
      type: COMPLETE_SESSION,
      payload: { todoId, data: res.data },
      // don't need sessionId in the reducer because we're updating the entire todo
      // payload: { todoId, sessionId, data: res.data },
    });
    dispatch(setAlert("Session Completed", "success"));
    dispatch({
      type: REMOVE_SESSION,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Edit Session
export const editSession = (todoId, sessionId, data) => async (dispatch) => {
  try {
    const res = await api.put(
      `/todos/session/edit/${todoId}/${sessionId}`,
      data
    );
    dispatch({
      type: EDIT_SESSION,
      payload: { todoId, data: res.data },
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Session
export const deleteSession = (todoId, sessionId) => async (dispatch) => {
  try {
    const res = await api.delete(`/todos/session/${todoId}/${sessionId}`);
    dispatch({
      type: DELETE_SESSION,
      payload: { todoId, data: res.data },
    });
    dispatch(setAlert("Session Removed", "success"));
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
/////////////////////////////////////////

// Start Break
export const startBreak = (todoId, data) => async (dispatch) => {
  try {
    const res = await api.post(`/todos/breaks/${todoId}`, data);
    // adds a session to the todo
    dispatch({
      type: START_BREAK,
      payload: { todoId, data: res.data },
    });
    // sets the current break
    dispatch({
      type: SET_CURRENT_BREAK,
      payload: res.data,
    });
    // dispatch(setAlert("Session Started", "success"));
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      // broken
      // payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Complete Break
export const completeBreak = (todoId, breakId, data) => async (dispatch) => {
  try {
    const res = await api.put(`/todos/breaks/${todoId}/${breakId}`, data);
    dispatch({
      type: COMPLETE_BREAK,
      payload: { todoId, data: res.data },
      // don't need sessionId in the reducer because we're updating the entire todo
      // payload: { todoId, breakId, data: res.data },
    });
    dispatch({
      type: REMOVE_CURRENT_BREAK,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Edit Break
export const editBreak = (todoId, breakId, data) => async (dispatch) => {
  try {
    const res = await api.put(`/todos/breaks/edit/${todoId}/${breakId}`, data);
    dispatch({
      type: EDIT_BREAK,
      payload: { todoId, data: res.data },
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Break
export const deleteBreak = (todoId, breakId) => async (dispatch) => {
  try {
    const res = await api.delete(`/todos/breaks/${todoId}/${breakId}`);
    dispatch({
      type: DELETE_BREAK,
      payload: { todoId, data: res.data },
    });
    // dispatch(setAlert("Session Removed", "success"));
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
