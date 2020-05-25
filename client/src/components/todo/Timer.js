import React from "react";
import moment from "moment";

const Timer = ({ time, mode, currentTask }) => {
  const [elapsedTime] = time;
  const [currentMode] = mode;
  const [task] = currentTask;
  return (
    <div className="timer">
      <div className="task large">
        {task == null ? "select a task" : task.text}
      </div>
      <div className="lead">{currentMode}</div>
      <div className="elapsed-time x-large">
        {moment(elapsedTime).format("mm:ss")}
      </div>
    </div>
  );
};
export default Timer;
