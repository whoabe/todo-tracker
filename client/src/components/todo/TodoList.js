import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTodos, deleteTodo } from "../../actions/todo";
import { removeTask } from "../../actions/task";
import SessionsList from "./SessionsList";

const TodoList = ({
  getTodos,
  deleteTodo,
  todo: { todos },
  handleSwitchTask,
  removeTask,
  auth,
}) => {
  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  return (
    <div className="todo-list m-1">
      {todos.length ? (
        <table>
          <thead>
            <tr>
              <th />
              <th />
              <th>Task</th>
              <th>Time</th>
              <th>Sessions</th>
              {/* <th /> */}
              <th />
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              if (!todo.completed) {
                return (
                  <SessionsList
                    todo={todo}
                    key={todo._id}
                    handleSwitchTask={handleSwitchTask}
                  />
                );
              }
              return null;
            })}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({ todo: state.todo, auth: state.auth });

export default connect(mapStateToProps, {
  getTodos,
  deleteTodo,
  removeTask,
})(TodoList);
