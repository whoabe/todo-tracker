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

const Landing = ({ setAlert }) => {
  const [mode, setMode] = useState("timer");
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [timerTime, setTimerTime] = useState(0);

  // todo stuff
  const {
    todos,
    // addTodo,
    toggleTodo,
    deleteTodo,
    completeSession,
  } = useTodoState([
    {
      id: 1,
      text: "task 1",
      isCompleted: false,
      totalTime: 25,
      sessions: [
        {
          sessionID: 1,
          length: 25,
          startTime: "12:00",
          endTime: "12:25",
        },
      ],
    },
    {
      id: 2,
      text: "task 2",
      isCompleted: true,
      sessions: [],
      totalTime: 0,
    },
  ]);

  useInterval(
    () => setTimerTime(timerTime + 1000),
    isTimerActive ? 1000 : null
    // console.log(timerTime)
  );

  const handleStop = () => {
    // const momentEndTime = moment().format("MMMM Do YYYY, h:mm:ss a");
    setIsTimerActive(false);
    completeSession(timerTime, currentTask, mode);
    setMode("timer");
    setTimerTime(0);
  };

  const handleSwitchMode = () => {
    setIsTimerActive(false);
    completeSession(timerTime, currentTask, mode);
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
    if (currentTask != null && timerTime !== 0) {
      completeSession(timerTime, currentTask, mode);
    }
    setIsTimerActive(false);
    setMode("timer");
    // pass in the index of the task that was selected
    const currentTodo = todos.filter((todo) => todo.id === id)[0];
    setCurrentTask(currentTodo);
    setTimerTime(0);
  };

  const checkCurrentTask = () => {
    // checks if there is a current task, otherwise setAlert
    // debugger;
    if (currentTask == null) {
      console.log("currentTask is " + currentTask);
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
          <Timer
            time={[timerTime, setTimerTime]}
            mode={[mode, setMode]}
            currentTask={[currentTask]}
          />
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
            // todos={todos}
            toggleTodo={toggleTodo}
            // deleteTodo={deleteTodo}
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

export default connect(null, { setAlert })(Landing);
