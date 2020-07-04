import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTodos, deleteTodo } from "../../actions/todo";
import { removeTask } from "../../actions/task";

const TodoList = ({
  getTodos,
  deleteTodo,
  todo: { todos },
  handleSwitchTask,
  removeTask,
}) => {
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div className="todo-list m-1">
      {todos.length > 0 && (
        <ul>
          {todos.map((todo) => (
            <div key={todo._id} className="todo-row">
              <input
                type="checkbox"
                checked={todo.isCompleted}
                // onChange={() => toggleTodo(todo.id)}
              />
              <span
                className="todo-text mx"
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "",
                }}
                onClick={() => handleSwitchTask(todo._id)}
              >
                {todo.value}
              </span>
              <span className="todo-sessions mx">
                {/* this should be the number of "timers" completed */}
                {todo.sessions.length}
                {/* {todo.sessions.length > 0 ? todo.sessions.length : null} */}
              </span>
              {/* <span className="todo-time mx">
              {todo.totalTime.length > 0 ? todo.totalTime : null}
            </span> */}
              {/* <button
                className="delete-btn"
                onClick={() => {
                  deleteTodo(todo._id);
                  removeTask();
                }}
              > */}
              {/* <span>&times;</span> */}
              {todo.sessions.length > 0 && (
                <span className="mx dropdown-span">
                  <i
                    className="fas fa-angle-down"
                    onClick={() => console.log("drop down clicked")}
                  ></i>
                </span>
              )}
              <span className="mx edit-span">
                <i
                  className="far fa-edit"
                  onClick={() => console.log("edit button clicked")}
                ></i>
              </span>
              <span className="mx trash-span">
                <i
                  className="far fa-trash-alt"
                  onClick={() => {
                    deleteTodo(todo._id);
                    removeTask();
                  }}
                ></i>
              </span>
              {/* </button> */}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({ todo: state.todo });

export default connect(mapStateToProps, { getTodos, deleteTodo, removeTask })(
  TodoList
);
// import React from "react";

// const TodoList = ({ todos, toggleTodo, deleteTodo, handleSwitchTask }) => {
//   return (
//     <div className="todo-list m-1">
//       <ul>
//         {todos.map((todo) => (
//           <div key={todo.id} className="todo-row">
//             <input
//               type="checkbox"
//               checked={todo.isCompleted}
//               onChange={() => toggleTodo(todo.id)}
//             />
//             <span
//               className="todo-text mx"
//               style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
//               onClick={() => handleSwitchTask(todo.id)}
//             >
//               {todo.text}
//             </span>
//             <span className="todo-sessions mx">
//               {/* this should be the number of "timers" completed */}
//               {todo.sessions.length}
//               {/* {todo.sessions.length > 0 ? todo.sessions.length : null} */}
//             </span>
//             <span className="todo-time mx">
//               {todo.totalTime.length > 0 ? todo.totalTime : null}
//             </span>
//             <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
//               {/* <i className="fas fa-times"></i> */}
//               <span>&times;</span>
//             </button>
//           </div>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoList;
