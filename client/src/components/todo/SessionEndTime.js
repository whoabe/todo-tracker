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
      const data = { endTime: inputValue };
      editSession(todoId, session._id, data);
      setIsInputActive(false);
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
        setIsInputActive(false);
      }
      // if Escape is pressed, revert the text and close the editor
      if (esc) {
        setInputValue(session.endTime);
        setIsInputActive(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enter, esc]); // watch the Enter and Escape key presses
  if (session.endTime) {
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
          value={moment(inputValue).local().format("YYYY-MM-DDTHH:mm:ss")}
          onChange={(e) => {
            if (
              e.target.value <
              moment(session.endTime).local().format("YYYY-MM-DDTHH:mm:ss")
            ) {
              setInputValue(inputValue);
            } else {
              setInputValue(e.target.value);
            }
          }}
          className={`inline-text_input inline-text_input--${
            isInputActive ? "active" : "hidden"
          }`}
        />
      </span>
    );
  } else {
    return <span>-</span>;
  }
};

export default connect(null, {
  editSession,
})(SessionEndTime);
