import React from "react";
import moment from "moment";

const FormatTime = ({ elapsedTime }) => {
  if (elapsedTime >= 3600000) {
    return <span>{moment(elapsedTime).format("hh:mm:ss")}</span>;
  } else {
    return <span>{moment(elapsedTime).format("mm:ss")}</span>;
  }

  //   {
  //     elapsedTime >= 3600000 ? (
  //       <span>{moment(elapsedTime).format("hh:mm:ss")}</span>
  //     ) : (
  //       <span>{moment(elapsedTime).format("mm:ss")}</span>
  //     );
  //   }
};

export default FormatTime;
