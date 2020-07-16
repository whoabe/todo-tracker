const toLocalTime = (UTCstring) => {
  let localTime = new Date(UTCstring)
    // .toLocaleString("en-us", { hour12: false })
    .toLocaleTimeString("en-us", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    })
    .split(" ");
  return localTime;
};

export default toLocalTime;
