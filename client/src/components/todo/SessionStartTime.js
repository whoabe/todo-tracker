import React, { useState, useEffect, useRef } from "react";
import useKeyPress from "../../hooks/useKeyPress";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { connect } from "react-redux";
import { editSession } from "../../actions/session";

const SessionStartTime = ({ session, editSession }) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(session.starTime);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeyPress("Enter");
  const esc = useKeyPress("Escape");

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      //   onSetText(inputValue);
      const data = { startTime: inputValue };
      editSession(session.startTime, data);
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
        const data = { startTime: inputValue };
        editSesssion(session.startTime, data);
        console.log("enter key pressed");
        setIsInputActive(false);
      }
      // if Escape is pressed, revert the text and close the editor
      if (esc) {
        console.log("esc key pressed");
        setInputValue(session.startTime);
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
        {session.startTime}
      </span>
      <input
        type="text"
        ref={inputRef}
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
  );
};

export default connect(null, {
  editSession,
})(SessionStartTime);
