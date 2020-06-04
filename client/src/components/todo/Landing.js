// Contains the Todo Tracker component

import React, { useState } from "react";
import { connect } from "react-redux";
import useTodoState from "../../hooks/useTodoState";
import useInterval from "../../hooks/useInterval";
import Timer from "./Timer";
import Controls from "./Controls";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { setAlert } from "../../actions/alert";
import { setTask } from "../../actions/task";
import { startSession, completeSession } from "../../actions/todo";

const Landing = ({
  setAlert,
  setTask,
  task,
  startSession,
  completeSession,
  todo: { todos },
}) => {
  const [mode, setMode] = useState("timer");
  const [isTimerActive, setIsTimerActive] = useState(false);
  // const [currentTask, setCurrentTask] = useState(null);
  const [timerTime, setTimerTime] = useState(0);

  // todo stuff
  // const {
  //   todos,
  //   // addTodo,
  //   toggleTodo,
  //   // completeSession,
  // } = useTodoState([
  //   {
  //     id: 1,
  //     text: "task 1",
  //     isCompleted: false,
  //     totalTime: 25,
  //     sessions: [
  //       {
  //         sessionID: 1,
  //         length: 25,
  //         startTime: "12:00",
  //         endTime: "12:25",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     text: "task 2",
  //     isCompleted: true,
  //     sessions: [],
  //     totalTime: 0,
  //   },
  // ]);

  useInterval(
    () => setTimerTime(timerTime + 1000),
    isTimerActive ? 1000 : null
    // console.log(timerTime)
  );

  const handleStop = () => {
    // const momentEndTime = moment().format("MMMM Do YYYY, h:mm:ss a");
    setIsTimerActive(false);
    completeSession(timerTime, task, mode);
    setMode("timer");
    setTimerTime(0);
  };

  const handleSwitchMode = () => {
    setIsTimerActive(false);
    completeSession(timerTime, task, mode);
    if (mode === "timer") {
      setMode("break");
      setTimerTime(0);
      setIsTimerActive(true);
    } else if (mode === "break") {
      setMode("timer");
      setTimerTime(0);
      setIsTimerActive(true);
    }
    // can shorten this code if we just change the state name to isModeTimer or something like that
    // i guess having modes break and timer make it easier to read
  };

  const handleSwitchTask = (id) => {
    // only completes session if there is a current task and the timer time is not 0
    if (task != null && timerTime !== 0) {
      completeSession(timerTime, task, mode);
    }
    setIsTimerActive(false);
    setMode("timer");
    // pass in the index of the task that was selected
    const currentTodo = todos.filter((todo) => todo._id === id)[0];
    setTask(currentTodo);
    setTimerTime(0);
  };

  const checkCurrentTask = () => {
    // checks if there is a current task, otherwise setAlert
    // debugger;
    if (task == null) {
      console.log("currentTask is " + task);
      setAlert("No task selected", "danger");
      return false;
    } else {
      return true;
    }
  };

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <Timer time={[timerTime, setTimerTime]} mode={[mode, setMode]} />
          <Controls
            checkCurrentTask={checkCurrentTask}
            isTimerActive={[isTimerActive, setIsTimerActive]}
            // handleReset={handleReset}
            timerTime={timerTime}
            // breakTime={breakTime}
            mode={[mode, setMode]}
            handleStop={handleStop}
            handleSwitchMode={handleSwitchMode}
          />
          <TodoList
            // toggleTodo={toggleTodo}
            handleSwitchTask={handleSwitchTask}
          />
          <TodoForm
          // saveTodo={(todoText) => {
          //   const trimmedText = todoText.trim();

          //   if (trimmedText.length > 0) {
          //     addTodo(trimmedText);
          //   }
          // }}
          />
          {/* <h1 className="x-large">Todo Tracker</h1>
          <p className="lead">
            Track your todo items and get analytics on them
          </p> */}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  task: state.task.task,
  todo: state.todo,
});

export default connect(mapStateToProps, {
  setAlert,
  setTask,
  startSession,
  completeSession,
})(Landing);
