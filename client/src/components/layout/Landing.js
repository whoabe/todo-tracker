// Contains the Todo Tracker component

import React, { useState } from "react";

const Landing = () => {
  const [timerTime, setTimerTime] = useState(0);
  const [breakTimerTime, setBreakTimerTime] = useState(0);
  const [isactive, setIsActive] = useState(false);

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Todo Tracker</h1>
          <p className="lead">
            Track your todo items and get analytics on them
          </p>
        </div>
      </div>
    </section>
  );
};

export default Landing;
