import React, { useState, useEffect, useRef } from "react";
import useKeyPress from "../../hooks/useKeyPress";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { connect } from "react-redux";
import { editSession } from "../../actions/todo";
import toLocalTime from "../../utils/toLocalTime";
import moment from "moment";

const SessionEndTime = ({ session, editSession, todoId }) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(session.endTime);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeyPress("Enter");
  const esc = useKeyPress("Escape");

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      //   onSetText(inputValue);
      //   const dateNowStartTime = JSON.stringify(Date.now(inputValue));
      //   const data = { startTime: dateNowStartTime };
      const data = { endTime: inputValue };
      editSession(todoId, session._id, data);
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
        const data = { endTime: inputValue };
        editSession(todoId, session._id, data);
        console.log("enter key pressed");
        setIsInputActive(false);
      }
      // if Escape is pressed, revert the text and close the editor
      if (esc) {
        console.log("esc key pressed");
        setInputValue(session.endTime);
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
      >
        {toLocalTime(session.endTime)}
      </span>
      <input
        type="datetime-local"
        ref={inputRef}
        // min={moment(session.startTime).local().format("YYYY-MM-DDTHH:mm:ss")}
        // style={{ width: "8rem" }}
        value={moment(inputValue).local().format("YYYY-MM-DDTHH:mm:ss")}
        onChange={(e) => {
          //   if (e.target.value < session.startTime) {
          //     setInputValue(inputValue);
          //   } else {
          setInputValue(e.target.value);
          //   }
        }}
        className={`inline-text_input inline-text_input--${
          isInputActive ? "active" : "hidden"
        }`}
      />
    </span>
  );
};

export default connect(null, {
  editSession,
})(SessionEndTime);
