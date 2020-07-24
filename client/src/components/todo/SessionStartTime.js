import React, { useState, useEffect, useRef } from "react";
import useKeyPress from "../../hooks/useKeyPress";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { connect } from "react-redux";
import { editSession } from "../../actions/todo";
import toLocalTime from "../../utils/toLocalTime";
import moment from "moment";

const SessionStartTime = ({ session, editSession, todoId, currentSession }) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(session.startTime);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeyPress("Enter");
  const esc = useKeyPress("Escape");

  const currentSessionCheck = () => {
    if (currentSession && currentSession._id === session._id) {
      return;
    } else {
      setIsInputActive(true);
    }
  };

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      const data = { startTime: inputValue };
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
        const data = { startTime: inputValue };
        editSession(todoId, session._id, data);
        setIsInputActive(false);
      }
      // if Escape is pressed, revert the text and close the editor
      if (esc) {
        setInputValue(session.startTime);
        setIsInputActive(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enter, esc]); // watch the Enter and Escape key presses

  return (
    <span className="inline-text" ref={wrapperRef}>
      <span
        ref={textRef}
        onClick={() => currentSessionCheck()}
        className={`inline-text_copy inline-text_copy--${
          !isInputActive ? "active" : "hidden"
        }`}
      >
        {toLocalTime(session.startTime)}
      </span>
      <input
        type="datetime-local"
        ref={inputRef}
        max={moment(session.endTime).local().format("YYYY-MM-DDTHH:mm:ss")}
        // style={{ width: "8rem" }}
        value={moment(inputValue).local().format("YYYY-MM-DDTHH:mm:ss")}
        onChange={(e) => {
          if (
            e.target.value >
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
};

const mapStateToProps = (state) => ({
  currentSession: state.currentSession,
});

export default connect(mapStateToProps, {
  editSession,
})(SessionStartTime);
