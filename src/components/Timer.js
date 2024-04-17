import React, { useEffect, useState } from "react";

function Timer({ duration, onTimeOut }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    // start timer
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        // stop the timer and call onTimeOut when timeLeft is 0
        if (!prev) {
          onTimeOut();
          // clear interval when timeLeft is 0
          clearInterval(intervalId);
          return prev;
        }
        // decrease timeLeft by one second
        return prev - 1;
      });
    }, 1000);
    // clear interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <p>Time left: {timeLeft} seconds</p>
    </div>
  );
}

export default Timer;
