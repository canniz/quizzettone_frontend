import React, { useEffect, useState } from 'react';

function Timer({ duration, onTimeOut }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!timeLeft) return onTimeOut();

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onTimeOut]);

  return (
    <div>
      <p>Time left: {timeLeft} seconds</p>
    </div>
  );
}

export default Timer;
