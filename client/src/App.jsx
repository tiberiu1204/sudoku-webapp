import React, { useState, useEffect } from 'react';
import { Board } from './Components/Board';

const SERVER = "http://localhost:5000"

function App() {
  const [board, setBoard] = useState();

  useEffect(() => {
    fetch(SERVER + "/board").then(
      res => res.json()
    ).then(
      board => {
        setBoard(board);
        console.log(board);
      }
    )
  }, []);

  if(!board) {
    return;
  }

  return (
    <Board board={board} setBoard={setBoard}/>  
  );
}

export default App;