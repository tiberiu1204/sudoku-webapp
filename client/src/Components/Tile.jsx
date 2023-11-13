import { getSquare, getCol, getRow } from "../utils";
import { useState } from "react";

const Tile = ({ index, selected, setSelected, value }) => {
  function handleHighlight() {
    let square = getSquare(index);
    let row = getRow(index);
    let col = getCol(index);
    if (index === selected.index) {
      return "sudoku-selected-strong";
    }
    if (Math.abs(value) === Math.abs(selected.value) && value) {
      return "sudoku-selected-value";
    }
    if (
      square === getSquare(selected.index) ||
      row === getRow(selected.index) ||
      col === getCol(selected.index)
    ) {
      return "sudoku-selected";
    }
    return "";
  }

  function displayValue() {
    if (value === 0) {
      return "";
    }
    if (value < 0) {
      return -value;
    }
    return value;
  }

  return (
    <div
      className={`sudoku-tile ${handleHighlight()}`}
      onClick={() => {
        setSelected({ index: index, value: value });
      }}
    >
      <div className={`sudoku-tile-value ${value < 0 ? "sudoku-wrong" : ""}`}>
        {displayValue()}
      </div>
    </div>
  );
};

export default Tile;
