import { useState, useEffect } from "react";
import { convertMilliseconds, countdownIn24Hours } from "../utils";

export default function Countdown(props) {
  const { handleChangePage, daysWords, datetime, day } = props;

  const targetMilliseconds = datetime || Date.UTC(2025, 2, 17, 12, 0, 0);
  const [remainingMs, setRemainingMs] = useState(
    countdownIn24Hours(targetMilliseconds)
  );
  const timer = convertMilliseconds(remainingMs);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingMs(countdownIn24Hours(targetMilliseconds));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetMilliseconds]);

  console.log(timer);
  return (
    <div className="card countdown-card">
      <h1 className="item-header">Day {day}</h1>
      <div className="today-container">
        <div>
          <p>Time Remaining:</p>
          <h3>
            {datetime
              ? `${Math.abs(timer.hours)}H ${Math.abs(
                  timer.minutes
                )}M ${Math.abs(timer.seconds)}S}`
              : "23H 59M 59S"}
          </h3>
        </div>
        <div>
          <p> Words for Today</p>
          <h3>{daysWords.length}</h3>
        </div>
      </div>

      <button
        onClick={() => {
          handleChangePage(2);
        }}
        className="start-task"
      >
        <h6>Start</h6>
      </button>
    </div>
  );
}
