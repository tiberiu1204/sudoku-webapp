import React, { useState, useEffect } from "react";
import { Board } from "./Components/Board";
import "./App.css";

const SERVER = "http://localhost:5000";

function App() {
  const [board, setBoard] = useState();

  const DIFFICULTY = 2;

  useEffect(() => {
    fetch(SERVER + "/board", {
      method: "POST",
      body: JSON.stringify(DIFFICULTY),
    })
      .then((res) => res.json())
      .then((board) => {
        setBoard(board);
      });
  }, []);

  if (!board) {
    return (
      <div className="loading-wrapper">
        <h1 className="loading">Generating game board...</h1>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <Board board={board} setBoard={setBoard} />
    </div>
  );
}

export default App;
