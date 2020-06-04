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
  // console.log("activeStatus: " + activeStatus);
  // console.log("isTimerActive: " + isTimerActive);
  // console.log("timer time: " + timerTime);
  // console.log("mode: " + mode);
  return (
    <div className="controls">
      {/* if the mode = timer and timer is not active, then show start button */}
      {currentMode === "timer" && activeStatus === false && timerTime === 0 ? (
        <button
          onClick={() => checkCurrentTask() && setActiveStatus(!activeStatus)}
        >
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
  task: state.task.task,
});

export default connect(mapStateToProps, { startSession })(Controls);
