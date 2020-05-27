import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../../actions/todo";
import useInputState from "../../hooks/useInputState";

const TodoForm = ({ addTodo }) => {
  const { value, reset, onChange } = useInputState();
  return (
    <div className="todo-form">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addTodo({ value });
          reset();
        }}
      >
        <input
          type="text"
          className="input"
          onChange={onChange}
          value={value}
        />
      </form>
    </div>
  );
};

export default connect(null, { addTodo })(TodoForm);
// import React from "react";
// import useInputState from "../../hooks/useInputState";

// const TodoForm = ({ saveTodo }) => {
//   const { value, reset, onChange } = useInputState();
//   return (
//     <div className="todo-form">
//       <form
//         onSubmit={(event) => {
//           event.preventDefault();
//           saveTodo(value);
//           reset();
//         }}
//       >
//         <input
//           type="text"
//           className="input"
//           onChange={onChange}
//           value={value}
//         />
//       </form>
//     </div>
//   );
// };

// export default TodoForm;
