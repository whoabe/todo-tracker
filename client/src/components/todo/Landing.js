// Contains the Todo Tracker component

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import useInterval from "../../hooks/useInterval";
import Timer from "./Timer";
import Controls from "./Controls";
import TodoList from "./TodoList";
import CompletedTodoList from "./CompletedTodoList";
import TodoForm from "./TodoForm";
import { setAlert } from "../../actions/alert";
import { setTask } from "../../actions/task";
import {
  startSession,
  completeSession,
  startBreak,
  completeBreak,
} from "../../actions/todo";

const Landing = ({
  setAlert,
  setTask,
  task,
  completeSession,
  todos,
  currentSession,
  startSession,
  startBreak,
  completeBreak,
  currentBreak,
}) => {
  useEffect(() => {
    checkIfCompletedTask(todos);
  });
  const [mode, setMode] = useState("timer");
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerTime, setTimerTime] = useState(0);
  const [showCompletedTodoList, setShowCompletedTodoList] = useState(false);

  useInterval(
    () => setTimerTime(timerTime + 1000),
    isTimerActive ? 1000 : null
  );

  const checkIfCompletedTask = (todos) => {
    if (todos && todos.find((todo) => todo.completed === true)) {
      setShowCompletedTodoList(true);
    }
  };

  const completeSessionData = () => {
    const endTime = JSON.stringify(Date.now());
    const data = { endTime };
    return data;
  };

  const completeBreakData = () => {
    const breakEndData = { endTime: JSON.stringify(Date.now()) };
    return breakEndData;
  };

  const handleStop = () => {
    setIsTimerActive(false);
    // need to have if currentSession === null, completeBreak()
    if (currentSession) {
      completeSession(task._id, currentSession._id, completeSessionData());
    }
    if (currentBreak) {
      completeBreak(task._id, currentBreak._id, completeBreakData());
    }
    setMode("timer");
    setTimerTime(0);
  };

  const handleSwitchMode = () => {
    setIsTimerActive(false);
    // completeSession(timerTime, task, mode);
    if (currentSession != null) {
      completeSession(task._id, currentSession._id, completeSessionData());
    } else {
      const startTime = JSON.stringify(Date.now());
      const data = { startTime: startTime };
      startSession(task._id, data);
    }
    if (mode === "timer") {
      // timer to break
      setMode("break");
      setTimerTime(0);
      setIsTimerActive(true);
      const breakData = { startTime: JSON.stringify(Date.now()) };
      startBreak(task._id, breakData);
    } else if (mode === "break") {
      // need the current breakId in here
      completeBreak(task._id, currentBreak._id, completeBreakData());
      setMode("timer");
      setTimerTime(0);
      setIsTimerActive(true);
    }
  };

  const handleSwitchTask = (id) => {
    // only completes session if there is a current task and the timer time is not 0
    if (task != null && timerTime !== 0) {
      // completeSession(timerTime, task, mode);
      completeSession(task._id, currentSession._id, completeSessionData());
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
            timerTime={timerTime}
            mode={[mode, setMode]}
            handleStop={handleStop}
            handleSwitchMode={handleSwitchMode}
          />
          <TodoList handleSwitchTask={handleSwitchTask} />
          <TodoForm
          // saveTodo={(todoText) => {
          //   const trimmedText = todoText.trim();

          //   if (trimmedText.length > 0) {
          //     addTodo(trimmedText);
          //   }
          // }}
          />
          {showCompletedTodoList
            ? [
                <hr
                  style={{
                    width: "15rem",
                    marginTop: "1rem",
                    marginBottom: "0.5rem",
                  }}
                  key="1"
                />,
                <CompletedTodoList key="2" />,
              ]
            : null}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  task: state.task,
  todos: state.todo.todos,
  currentSession: state.currentSession,
  currentBreak: state.currentBreak,
});

export default connect(mapStateToProps, {
  setAlert,
  setTask,
  startSession,
  completeSession,
  startBreak,
  completeBreak,
})(Landing);
