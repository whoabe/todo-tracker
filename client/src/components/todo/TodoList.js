import React from "react";

const TodoList = ({ todos, toggleTodo, deleteTodo, handleSwitchTask }) => {
  return (
    <div className="todo-list m-1">
      <ul>
        {todos.map((todo) => (
          <div key={todo.id} className="todo-row">
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => toggleTodo(todo.id)}
            />
            <span
              className="todo-text mx"
              style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
              onClick={() => handleSwitchTask(todo.id)}
            >
              {todo.text}
            </span>
            <span className="todo-sessions mx">
              {/* this should be the number of "timers" completed */}
              {todo.sessions.length}
              {/* {todo.sessions.length > 0 ? todo.sessions.length : null} */}
            </span>
            <span className="todo-time mx">
              {todo.totalTime.length > 0 ? todo.totalTime : null}
            </span>
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
              {/* <i className="fas fa-times"></i> */}
              <span>&times;</span>
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
