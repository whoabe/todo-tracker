import React, { useEffect } from "react";
// import moment from "moment";
import { connect } from "react-redux";
import FormatTime from "./FormatTime";
import { setTask } from "../../actions/task";

const Timer = ({ time, mode, task, todos }) => {
  const [elapsedTime] = time;
  const [currentMode] = mode;
  // const [task] = currentTask;

  useEffect(() => {
    if (todos && todos.length > 0) {
      setTask(todos[0]);
    }
  });
  return (
    <div className="timer">
      <div className="task large">
        {task == null ? "add a task" : task.value}
        {/* should say create a task if the list is empty */}
      </div>
      <div className="lead">{currentMode}</div>
      <div className="elapsed-time x-large">
        {/* {moment(elapsedTime).format("mm:ss")} */}
        <FormatTime elapsedTime={elapsedTime} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  task: state.task,
  todos: state.todo.todos,
});

export default connect(mapStateToProps, { setTask })(Timer);
