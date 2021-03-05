import React, { useEffect, useState } from 'react';
import './App.css';
import { io } from "socket.io-client";

function App() {
  const [sendCount, setSendCount] = useState(0);
  const [getCount, setGetCount] = useState(0);
  const socket = io();

  useEffect(() => {
    socket.on('fromServerTo1', data => {
      console.log(data);
      setGetCount(data.testState);
    })
  })

  const onClickHandler = () => {
    setSendCount(prev => ++prev);
    socket.emit('from2to1', {testState: sendCount})
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>This is the component 2</h1>
        <button onClick={onClickHandler}>TRY CLICKING ME SEVERAL TIMES!</button>
        <span>Recieved: {getCount}</span>
      </header>
    </div>
  );
}

export default App;

