import React, { useState, useEffect } from "react";
import Square from "./Square";
import { getRow, getCol, boardToRenderBoard } from "../utils";
import "./Board.css";

const SERVER = "http://localhost:5000";

const arr = new Array(9);
const changePermited = new Array(9);

export const Board = ({ board, setBoard }) => {
  const [selected, setSelected] = useState(0);
  const [move, setMove] = useState(0);
  const [notes, setNotes] = useState(structuredClone(board));
  let shiftDown = false;

  useEffect(() => {
    let index = 0;
    for (let i = 0; i < 9; i++) {
      arr[i] = new Array(9);
      changePermited[i] = new Array(9);
    }
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        notes[i][j] = [];
        changePermited[i][j] = board[i][j] ? false : true;
        arr[getRow(index + 1) - 1][getCol(index + 1) - 1] = index;
        index++;
      }
    }
    setNotes(structuredClone(notes));
  }, []);

  useEffect(() => {
    if (move === 0) {
      return;
    }
    const [row, col, value, moveIsValid] = move;
    if (!moveIsValid) {
      board[row][col] = -value;
    } else {
      board[row][col] = value;
    }
    setSelected({ index: selected.index, value: value });
    setBoard(structuredClone(board));
  }, [move]);

  const handleKeyPress = (e) => {
    if (e.key === "\\") return;
    const { index } = selected;
    let row = getRow(index) - 1,
      col = getCol(index) - 1;
    if (!selected) return;
    switch (e.key) {
      case "ArrowUp":
        if (row - 1 >= 0) {
          setSelected({
            index: arr[row - 1][col] + 1,
            value: board[row - 1][col],
          });
        }
        break;
      case "ArrowRight":
        if (col + 1 < 9) {
          setSelected({
            index: arr[row][col + 1] + 1,
            value: board[row][col + 1],
          });
        }
        break;
      case "ArrowDown":
        if (row + 1 < 9) {
          setSelected({
            index: arr[row + 1][col] + 1,
            value: board[row + 1][col],
          });
        }
        break;
      case "ArrowLeft":
        if (col - 1 >= 0) {
          setSelected({
            index: arr[row][col - 1] + 1,
            value: board[row][col - 1],
          });
        }
        break;
      case "Delete":
      case "Backspace":
        if (!changePermited[row][col]) return;
        board[row][col] = 0;
        setBoard(structuredClone(board));
        setSelected({ index: index, value: 0 });
        break;
      default:
        break;
    }
    if ("123456789".search(e.key) !== -1) {
      if (shiftDown) {
        console.log(e);
      }
      const [row, col] = [
        getRow(selected.index) - 1,
        getCol(selected.index) - 1,
      ];
      if (!changePermited[row][col]) {
        return;
      }
      fetch(SERVER + "/validate", {
        method: "POST",
        body: JSON.stringify([row, col, Number(e.key)]),
      })
        .then((res) => res.json())
        .then((moveIsValid) => {
          setMove([row, col, Number(e.key), moveIsValid]);
          return;
        });
    }
  };

  return (
    <div className="sudoku-board" tabIndex={0} onKeyDown={handleKeyPress}>
      {boardToRenderBoard(board).map((tiles, index) => {
        return (
          <Square
            key={index}
            tiles={tiles}
            index={index}
            selected={selected}
            setSelected={setSelected}
          />
        );
      })}
    </div>
  );
};
