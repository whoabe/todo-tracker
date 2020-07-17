import React, { useState, useEffect, useRef } from "react";
import useKeyPress from "../../hooks/useKeyPress";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { connect } from "react-redux";
import { editTodo } from "../../actions/todo";

const TodoText = ({ todo, editTodo }) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(todo.value);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeyPress("Enter");
  const esc = useKeyPress("Escape");

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      //   onSetText(inputValue);
      const data = { value: inputValue };
      editTodo(todo._id, data);
      setIsInputActive(false);
      console.log("useClickOutside");
    }
  });

  // focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive) {
      //   debugger;
      inputRef.current.focus();
    }
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and case the editor
      if (enter) {
        // onSetText(inputValue);
        const data = { value: inputValue };
        editTodo(todo._id, data);
        console.log("enter key pressed");
        setIsInputActive(false);
      }
      // if Escape is pressed, revert the text and close the editor
      if (esc) {
        console.log("esc key pressed");
        setInputValue(todo.value);
        setIsInputActive(false);
      }
    }
  }, [enter, esc]); // watch the Enter and Escape key presses

  return (
    <span className="inline-text" ref={wrapperRef}>
      <span
        ref={textRef}
        onClick={() => setIsInputActive(true)}
        className={`inline-text_copy inline-text_copy--${
          !isInputActive ? "active" : "hidden"
        }`}
        style={{
          textDecoration: todo.completed ? "line-through" : "",
        }}
      >
        {todo.value}
      </span>
      <input
        type="text"
        ref={inputRef}
        // set the width to the input length multiplied by the x height
        // it's not quite right but gets it close
        //   style={{ width: Math.ceil(inputValue.length * 0.9) + "ex" }}
        style={{ width: "8rem" }}
        maxLength="15"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        className={`inline-text_input inline-text_input--${
          isInputActive ? "active" : "hidden"
        }`}
      />
    </span>

    // <span className="inline-text" ref={wrapperRef}>
    //     <span
    //         className="todo-text"
    //         style={{
    //             textDecoration: todo.isCompleted ? "line-through" : "",
    //         }}
    //         onClick={() => handleSwitchTask(todo._id)}
    //     >
    //         {todo.value}
    //     </span>
    //     <input ref={inputRef} value={inputValue} onChange={e => { setInputValue(e.target.value); }} className={`inline-text_input inline-text_input--${isInputActive ? "active" : "hidden"}`} type="text" />
    // </span>
  );
};

export default connect(null, {
  editTodo,
})(TodoText);
