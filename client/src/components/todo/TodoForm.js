import React from "react";
import useInputState from "../../hooks/useInputState";

const TodoForm = ({ saveTodo }) => {
  const { value, reset, onChange } = useInputState();
  return (
    <div className="todo-form">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          saveTodo(value);
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

export default TodoForm;
