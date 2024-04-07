import React, { useState } from 'react';
import './globals.css';

const App = () => {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [isRunning, setIsRunning] = useState(false);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setWorkDuration(25);
    setBreakDuration(5);
  };

  const handleSet = () => {
    if (workDuration > 0 && breakDuration > 0) {
      setIsRunning(false);
    } else {
      alert("Work duration and break duration cannot be set to 0 simultaneously.");
    }
  };

  return (
    <div id="main">
      <div>
        <label>Work Duration:</label>
        <input
          type="number"
          value={workDuration}
          onChange={(e) => setWorkDuration(parseInt(e.target.value))}
          data-testid="work-duration"
          disabled={isRunning}
        />
      </div>
      <div>
        <label>Break Duration:</label>
        <input
          type="number"
          value={breakDuration}
          onChange={(e) => setBreakDuration(parseInt(e.target.value))}
          data-testid="break-duration"
          disabled={isRunning}
        />
      </div>
      <div>
        <button onClick={handleStart} data-testid="start-btn" disabled={isRunning}>Start</button>
        <button onClick={handleStop} data-testid="stop-btn" disabled={!isRunning}>Stop</button>
        <button onClick={handleReset} data-testid="reset-btn">Reset</button>
        <button onClick={handleSet} data-testid="set-btn">Set</button>
      </div>
    </div>
  );
};

export default App;
