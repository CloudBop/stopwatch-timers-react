import React from 'react';
import logo from './logo.svg';
import './App.css';
import StopWatch from './Components/StopWatch/StopWatch';
import StopWatchHOC from './Components/StopWatchWithHoc/StopWatchHOC';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h2>These are out of sync </h2>
      <div style={{ display: 'flex' }}>
        <StopWatch initialDegree={0} frameRate={60} />
        <StopWatch initialDegree={0} frameRate={30} />
        <StopWatch initialDegree={0} frameRate={15} />
      </div>
      <h2>In sync despite different frameRates</h2>
      <StopWatchHOC />
      </header>
    </div>
  );
}

export default App;
