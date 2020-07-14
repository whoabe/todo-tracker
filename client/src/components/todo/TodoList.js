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
}) => {
  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
            {todos.map((todo) => (
              <SessionsList
                todo={todo}
                key={todo._id}
                handleSwitchTask={handleSwitchTask}
              />
              // <div key={todo._id} className="todo-row">
              //   <input
              //     type="checkbox"
              //     checked={todo.isCompleted}
              //   />
              // <span
              //   className="todo-text mx"
              //   style={{
              //     textDecoration: todo.isCompleted ? "line-through" : "",
              //   }}
              //   onClick={() => handleSwitchTask(todo._id)}
              // >
              //     {todo.value}
              //   </span>
              // <span className="todo-sessions mx">
              //   {todo.sessions.length}
              // </span>
              // {todo.sessions.length > 0 && (
              //   <span className="mx dropdown-span">
              //     <i
              //       className="fas fa-angle-down"
              //       onClick={() => ToggleSessionList(todo._id)}
              //     ></i>
              //   </span>
              // )}
              //   <span className="mx edit-span">
              //     <i
              //       className="far fa-edit"
              //       onClick={() => console.log("edit button clicked")}
              //     ></i>
              //   </span>
              // <span className="mx trash-span">
              //   <i
              //     className="far fa-trash-alt"
              //     onClick={() => {
              //       deleteTodo(todo._id);
              //       removeTask();
              //     }}
              //   ></i>
              // </span>
              //   <div>
              //     {todo.sessions.length > 0
              //       ? todo.sessions.map((session, index) => (
              //           <div key={session._id}>
              //             <span>{index + 1}</span>
              //             <span>{session.startTime}</span>
              //             <span>{session.endTime}</span>
              //           </div>
              //         ))
              //       : null}
              //   </div>
              // </div>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({ todo: state.todo });

export default connect(mapStateToProps, { getTodos, deleteTodo, removeTask })(
  TodoList
);
// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import { getTodos, deleteTodo } from "../../actions/todo";
// import { removeTask } from "../../actions/task";
// import SessionsList from "./SessionsList";

// const TodoList = ({
//   getTodos,
//   deleteTodo,
//   todo: { todos },
//   handleSwitchTask,
//   removeTask,
// }) => {
//   useEffect(() => {
//     getTodos();
//   }, []);
//   return (
//     <div className="todo-list m-1">
//       {todos.length > 0 && (
//         <ul>
//           {todos.map((todo) => (
//             <div key={todo._id} className="todo-row">
//               <input
//                 type="checkbox"
//                 checked={todo.isCompleted}
//               />
//               <span
//                 className="todo-text mx"
//                 style={{
//                   textDecoration: todo.isCompleted ? "line-through" : "",
//                 }}
//                 onClick={() => handleSwitchTask(todo._id)}
//               >
//                 {todo.value}
//               </span>
//               <span className="todo-sessions mx">
//                 {todo.sessions.length}
//               </span>
//               {todo.sessions.length > 0 && (
//                 <span className="mx dropdown-span">
//                   <i
//                     className="fas fa-angle-down"
//                     onClick={() => ToggleSessionList(todo._id)}
//                   ></i>
//                 </span>
//               )}
//               <span className="mx edit-span">
//                 <i
//                   className="far fa-edit"
//                   onClick={() => console.log("edit button clicked")}
//                 ></i>
//               </span>
//               <span className="mx trash-span">
//                 <i
//                   className="far fa-trash-alt"
//                   onClick={() => {
//                     deleteTodo(todo._id);
//                     removeTask();
//                   }}
//                 ></i>
//               </span>
//               <div>
//                 {todo.sessions.length > 0
//                   ? todo.sessions.map((session, index) => (
//                       <div key={session._id}>
//                         <span>{index + 1}</span>
//                         <span>{session.startTime}</span>
//                         <span>{session.endTime}</span>
//                       </div>
//                     ))
//                   : null}
//               </div>
//             </div>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({ todo: state.todo });

// export default connect(mapStateToProps, { getTodos, deleteTodo, removeTask })(
//   TodoList
// );
