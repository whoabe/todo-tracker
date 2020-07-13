import React from "react";
import moment from "moment";
import { connect } from "react-redux";

const Timer = ({ time, mode, task }) => {
  const [elapsedTime] = time;
  const [currentMode] = mode;
  // const [task] = currentTask;
  return (
    <div className="timer">
      <div className="task large">
        {task == null ? "select a task" : task.value}
        {/* should say create a task if the list is empty */}
      </div>
      <div className="lead">{currentMode}</div>
      <div className="elapsed-time x-large">
        {moment(elapsedTime).format("mm:ss")}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  task: state.task.task,
});

export default connect(mapStateToProps, null)(Timer);