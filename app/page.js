import React, { useState, useEffect } from 'react';
import './globals.css';

const App = () => {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [isWorking, setIsWorking] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  
  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime === 0) {
            clearInterval(timer);
            alert(isWorking ? 'Break Time Finished!' : 'Work Time Finished!');
            setIsWorking(!isWorking);
            setTimeLeft(isWorking ? breakDuration * 60 : workDuration * 60);
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isRunning, isWorking, workDuration, breakDuration]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsWorking(true);
    setTimeLeft(workDuration * 60);
  };

  const handleWorkDurationChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0) {
      setWorkDuration(value);
      if (!isRunning && isWorking) {
        setTimeLeft(value * 60);
      }
    }
  };

  const handleBreakDurationChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0) {
      setBreakDuration(value);
      if (!isRunning && !isWorking) {
        setTimeLeft(value * 60);
      }
    }
  };

  return (
    <div id="main">
      <div>
        <input
          type="number"
          value={workDuration}
          onChange={handleWorkDurationChange}
          data-testid="work-duration"
          disabled={isRunning}
        />
        <input
          type="number"
          value={breakDuration}
          onChange={handleBreakDurationChange}
          data-testid="break-duration"
          disabled={isRunning}
        />
      </div>
      <div>
        {isWorking ? 'Work Time' : 'Break Time'}: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </div>
      <div>
        <button onClick={handleStart} data-testid="start-btn" disabled={isRunning}>Start</button>
        <button onClick={handleStop} data-testid="stop-btn" disabled={!isRunning}>Stop</button>
        <button onClick={handleReset} data-testid="reset-btn" disabled={isRunning}>Reset</button>
      </div>
    </div>
  );
};

export default App;
