import React, { useState, useEffect } from 'react';
import { Board } from './Components/Board';

const SERVER = "http://localhost:5000"

function App() {
  const [board, setBoard] = useState();

  const DIFFICULTY = 2;

  useEffect(() => {
    fetch(SERVER + "/board", {
      method: "POST",
      body: JSON.stringify(DIFFICULTY)
    }).then(
      res => res.json()
    ).then(
      board => {
        setBoard(board);
      }
    )
  }, []);

  if(!board) {
    return <h1>Generating game board. This might take a minute, depending 
              a difficulty level. All the puzzles are generated on site and have unique solutions.</h1>;
  }

  return (
    <Board board={board} setBoard={setBoard}/>  
  );
}

export default App;