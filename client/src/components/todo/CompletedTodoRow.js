import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteTodo, deleteSession, toggleTodo } from "../../actions/todo";
import { removeTask } from "../../actions/task";
import TodoText from "./TodoText";
import SessionStartTime from "./SessionStartTime";
import SessionEndTime from "./SessionEndTime";
import FormatTime from "./FormatTime";

const CompletedTodoRow = ({
  deleteTodo,
  todo,
  handleSwitchTask,
  removeTask,
  deleteSession,
  task,
  toggleTodo,
}) => {
  const [expanded, setExpanded] = useState(false);

  return [
    <tr key={todo._id}>
      <td>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => {
            toggleTodo(todo._id);
          }}
        />
      </td>
      <td>
        <TodoText todo={todo} />
      </td>
      <td>
        <FormatTime elapsedTime={todo.totalTime} />
      </td>
      <td>
        <div>
          <span className="todo-sessions">{todo.sessions.length}</span>
          {todo.sessions.length > 0 ? (
            <span className="mx dropdown-span">
              <i
                className="fas fa-angle-down"
                onClick={() => setExpanded(!expanded)}
              ></i>
            </span>
          ) : null}
        </div>
      </td>
      <td></td>
      <td>
        <span className="mx trash-span">
          <i
            className="far fa-trash-alt"
            onClick={() => {
              deleteTodo(todo._id);
              removeTask();
            }}
          ></i>
        </span>
      </td>
    </tr>,
    expanded &&
      todo.sessions.map((session, index) => (
        <tr key={session._id}>
          <td></td>
          <td></td>
          <td>{index + 1}</td>
          <td>
            <FormatTime elapsedTime={session.time} />
          </td>
          <td>
            <SessionStartTime session={session} todoId={todo._id} />
          </td>
          <td>
            <SessionEndTime session={session} todoId={todo._id} />
          </td>
          <td>
            <span className="mx trash-span">
              <i
                className="far fa-trash-alt"
                onClick={() => {
                  deleteSession(todo._id, session._id);
                }}
              ></i>
            </span>
          </td>
        </tr>
      )),
  ];
};

const mapStateToProps = (state) => ({
  task: state.task,
});

export default connect(mapStateToProps, {
  deleteTodo,
  deleteSession,
  removeTask,
  toggleTodo,
})(CompletedTodoRow);
