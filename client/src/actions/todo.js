import api from "../utils/api";
import {
  GET_TODOS,
  GET_TODO,
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  COMPLETE_SESSION,
  START_SESSION,
  TODO_ERROR,
} from "./types";
import { setAlert } from "../actions/alert";

// Get posts
export const getTodos = () => async (dispatch) => {
  try {
    const res = await api.get("/todos");

    dispatch({
      type: GET_TODOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add session
// // Add like
// export const addLike = id => async dispatch => {
//     try {
//         const res = await api.put(`/posts/like/${id}`);

//         dispatch({
//             type: UPDATE_LIKES,
//             payload: { id, likes: res.data }
//         });
//     } catch (err) {
//         dispatch({
//             type: POST_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status }
//         });
//     }
// };

// remove session
// // Remove like
// export const removeLike = id => async dispatch => {
//     try {
//         const res = await api.put(`/posts/unlike/${id}`);

//         dispatch({
//             type: UPDATE_LIKES,
//             payload: { id, likes: res.data }
//         });
//     } catch (err) {
//         dispatch({
//             type: POST_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status }
//         });
//     }
// };

// Delete todo
export const deleteTodo = (id) => async (dispatch) => {
  try {
    await api.delete(`/todos/${id}`);

    dispatch({
      type: DELETE_TODO,
      payload: id,
    });

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

// Start Session
export const startSession = (todoId, data) => async (dispatch) => {
  try {
    const res = await api.post(`/session/${todoId}`, data);
    dispatch({
      type: START_SESSION,
      payload: res.data,
    });
    dispatch(setAlert("Session Started", "success"));
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Complete Session
export const completeSession = (todoId, data) => async (dispatch) => {
  try {
    const res = await api.post(`/session/${todoId}`, data);
    dispatch({
      type: COMPLETE_SESSION,
      payload: res.data,
    });
    dispatch(setAlert("Session Completed", "success"));
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// // Add comment
// export const addComment = (postId, formData) => async dispatch => {
//     try {
//         const res = await api.post(`/posts/comment/${postId}`, formData);

//         dispatch({
//             type: ADD_COMMENT,
//             payload: res.data
//         });

//         dispatch(setAlert('Comment Added', 'success'));
//     } catch (err) {
//         dispatch({
//             type: POST_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status }
//         });
//     }
// };

// // Delete comment
// export const deleteComment = (postId, commentId) => async dispatch => {
//     try {
//         await api.delete(`/posts/comment/${postId}/${commentId}`);

//         dispatch({
//             type: REMOVE_COMMENT,
//             payload: commentId
//         });

//         dispatch(setAlert('Comment Removed', 'success'));
//     } catch (err) {
//         dispatch({
//             type: POST_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status }
//         });
//     }
// };
