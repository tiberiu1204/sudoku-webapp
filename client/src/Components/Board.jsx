import React, { useState } from 'react'
import "./Board.css"

const list = [
    [7, 8, 0, 4, 0, 0, 1, 2, 0],
    [6, 0, 0, 0, 7, 5, 0, 0, 9],
    [0, 0, 0, 6, 0, 1, 0, 7, 8],
    [0, 0, 7, 0, 4, 0, 2, 6, 0],
    [0, 0, 1, 0, 5, 0, 9, 3, 0],
    [9, 0, 4, 0, 6, 0, 0, 0, 5],
    [0, 7, 0, 3, 0, 0, 0, 1, 2],
    [1, 2, 0, 0, 0, 7, 4, 0, 0],
    [0, 4, 9, 2, 0, 6, 0, 0, 7]
];

function getRow(index) {
    return Math.floor((index - 1) / 27) * 3 + Math.floor((index - 1) % 9 / 3) + 1;
}

function getCol(index) {
    return Math.floor((index - 1) % 3) + Math.floor((index - 1) % 27  / 9) * 3 + 1;
}

function getSquare(index) {
    return Math.floor((index - 1) / 9) + 1;
}

const Tile = ({ value, index, selected, setSelected }) => {
    function handleHighlight() {
        let square = getSquare(index);
        let row = getRow(index);
        let col = getCol(index);
        if(index === selected.index) {
            return "sudoku-selected-strong";
        }
        if(value === selected.value && value) {
            return "sudoku-selected-value";
        }
        if(square === getSquare(selected.index) || row === getRow(selected.index) || col === getCol(selected.index)) {
            return "sudoku-selected";
        }
        return "";
    }
    return (
    <div 
        className={`sudoku-tile ${handleHighlight()}`} 
        onClick={() => {
            setSelected({index: index, value: value});
        }
    }>
        <div className='sudoku-tile-value'>{value ? value : ""}</div>
    </div>
  )
}

const Square = ({ tiles, index, selected, setSelected }) => {
    return (
        <div className="sudoku-square">
            {tiles.map((num, ind) => {
                return <Tile 
                        key={ind} 
                        value={num} 
                        index={index * 9 + ind + 1}
                        selected={selected} 
                        setSelected={setSelected}>
                    </Tile>
            })}
        </div>
    )
}

export const Board = () => {
    const [selected, setSelected] = useState(0);
    return (
    <div className='sudoku-board'>
        {list.map((tiles, index) => {
            return <Square 
                    key={index} 
                    tiles={tiles} 
                    index={index}
                    selected={selected}
                    setSelected={setSelected}
                />
        })}
    </div>
  )
}
