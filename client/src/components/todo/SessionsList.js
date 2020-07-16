import React, { useState } from "react";
// import { useEffect } from "react";
import { connect } from "react-redux";
import { deleteTodo, deleteSession } from "../../actions/todo";
import { removeTask } from "../../actions/task";
import TodoText from "./TodoText";
import SessionStartTime from "./SessionStartTime";
import SessionEndTime from "./SessionEndTime";
// import moment from "moment";
import FormatTime from "./FormatTime";
import toLocalTime from "../../utils/toLocalTime";

// const msToTime = (ms) => {
//   let seconds = Math.floor(ms / 1000);
//   // 2- Extract hours:
//   let hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
//   seconds = seconds % 3600; // seconds remaining after extracting hours
//   // 3- Extract minutes:
//   let minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
//   // 4- Keep only seconds not extracted to minutes:
//   seconds = seconds % 60;
//   let output = hours + ":" + minutes + ":" + seconds;
//   return output;
// };

// const toLocalTime = (UTCstring) => {
//   let localTime = new Date(UTCstring)
//     // .toLocaleString("en-us", { hour12: false })
//     .toLocaleTimeString("en-us", {
//       hour12: false,
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//     .split(" ");
//   return localTime;
// };

const SessionsList = ({
  deleteTodo,
  todo,
  handleSwitchTask,
  removeTask,
  deleteSession,
  task,
}) => {
  const [expanded, setExpanded] = useState(false);

  // const toggleExpander = (e) => {
  //   setExpanded(!expanded)
  // }

  // useEffect(() => {
  //   if (expanded) {
  //     if ()
  //   }
  // })

  return [
    <tr key={todo._id}>
      <td>
        {task && task._id === todo._id ? (
          <i
            className="fas fa-caret-right fa-lg mx todo-selector-active"
            onClick={() => handleSwitchTask(todo._id)}
          ></i>
        ) : (
          <i
            className="fas fa-caret-right fa-lg mx todo-selector-inactive"
            onClick={() => handleSwitchTask(todo._id)}
          ></i>
        )}
      </td>
      <td>
        <input type="checkbox" checked={todo.isCompleted} />
      </td>
      <td>
        <TodoText todo={todo} />
        {/* <span className="inline-text" ref={wrapperRef}>
          <span
            className="todo-text"
            style={{
              textDecoration: todo.isCompleted ? "line-through" : "",
            }}
            onClick={() => handleSwitchTask(todo._id)}
            >
            {todo.value}
          </span>
          <input ref={inputRef} value={inputValue} onChange={e => {setInputValue(e.target.value);}} className={`inline-text_input inline-text_input--${isInputActive ? "active" : "hidden"}`} type="text"/>
        </span> */}
      </td>
      {/* <td>{msToTime(todo.totalTime)}</td> */}
      <td>
        {/* {moment(todo.totalTime).format("mm:ss")} */}
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
                // onClick={() => ToggleSessionList(todo._id)}
              ></i>
            </span>
          ) : null}
        </div>
      </td>
      {/* <td>
        <span className="mx edit-span">
          <i
            className="far fa-edit"
            onClick={() => console.log("edit button clicked")}
          ></i>
        </span>
      </td> */}
      <td></td>
      <td>
        <span className="mx trash-span">
          <i
            className="far fa-trash-alt"
            onClick={() => {
              console.log("delete task");
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
            {/* {msToTime(session.time)} */}
            <FormatTime elapsedTime={session.time} />
          </td>
          {/* <td>{toLocalTime(session.startTime)}</td> */}
          <td>
            <SessionStartTime session={session} todoId={todo._id} />
          </td>
          <td>
            <SessionEndTime session={session} todoId={todo._id} />
            {/* {toLocalTime(session.endTime)} */}
            {/* <span className="mx edit-span">
              <i
                className="far fa-edit"
                onClick={() => console.log("edit button clicked")}
              ></i>
            </span> */}
          </td>
          <td>
            <span className="mx trash-span">
              <i
                className="far fa-trash-alt"
                onClick={() => {
                  deleteSession(todo._id, session._id);
                  // removeTask();
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
})(SessionsList);
