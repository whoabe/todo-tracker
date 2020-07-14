import React from "react";
import { connect } from "react-redux";
import { startSession } from "../../actions/todo";

const Controls = ({
  checkCurrentTask,
  isTimerActive,
  //   handleReset,
  timerTime,
  pomoLength,
  // breakLength,
  mode,
  handleStop,
  handleSwitchMode,
  startSession,
  task,
}) => {
  const [activeStatus, setActiveStatus] = isTimerActive;
  const [currentMode] = mode;
  const handleStart = () => {
    if ((checkCurrentTask() === true) & (task != null)) {
      setActiveStatus(!activeStatus);
      const startTime = JSON.stringify(Date.now());
      const data = { startTime: startTime };
      startSession(task._id, data);
      // need to call setSession with the startSession response
      // setSession()
    }
  };

  return (
    <div className="controls">
      {/* if the mode = timer and timer is not active, then show start button */}
      {currentMode === "timer" && activeStatus === false && timerTime === 0 ? (
        <button onClick={() => handleStart()}>
          {/* check if there is a task, if there is then toggle the activestatus */}
          <i className="fas fa-play btn"></i>
        </button>
      ) : (
        // else show the break/timer button and the stop button
        <div>
          <button onClick={() => handleSwitchMode()}>
            {currentMode === "timer" ? (
              <div>
                {/* break */}
                <i className="fas fa-mug-hot btn">Break</i>
              </div>
            ) : (
              <div>
                {/* Timer */}
                <i className="fas fa-play btn">Timer</i>
              </div>
            )}
          </button>
          <button onClick={() => handleStop()}>
            {/* need to have the timer reset */}
            {/* stop */}
            <i className="far fa-pause-circle btn">Stop</i>
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  task: state.task,
  currentSession: state.currentSession,
});

export default connect(mapStateToProps, { startSession })(Controls);
