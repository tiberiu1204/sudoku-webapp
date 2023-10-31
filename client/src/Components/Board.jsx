import React, { useState, useEffect } from 'react'
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

const Tile = ({ index, selected, setSelected }) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        setValue(list[getRow(index) - 1][getCol(index) - 1]);
    }, list);

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

    const handleKeyPress = e => {
        if("123456789".search(e.key) !== -1) {
            setValue(e.key);
            console.log("yes");
        }
    }

    return (
    <div 
        className={`sudoku-tile ${handleHighlight()}`} 
        onClick={() => {
            setSelected({index: index, value: value});
        }}
        tabIndex={0} 
        onKeyDown={handleKeyPress}
        >
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
                        setSelected={setSelected}
                        >
                    </Tile>
            })}
        </div>
    )
}

const arr = new Array(9);

export const Board = () => {
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        let index = 0;
        for(let i = 0; i < 9; i++) {
            arr[i] = new Array(9);
        }
        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {
                arr[getRow(index + 1) - 1][getCol(index + 1) - 1] = index;
                index++;
            }
        }
    }, []);

    const handleKeyPress = e => {
        const { index } = selected;
        let row, col;
        if(!selected) return;
        switch(e.key) {
            case "ArrowUp":
                row = getRow(index) - 2;
                col = getCol(index) - 1;
                if(row >= 0) {
                    setSelected({index: arr[row][col] + 1, value: list[row][col]});
                }
                break;
            case "ArrowRight":
                row = getRow(index) - 1;
                col = getCol(index);
                if(col <= 8) {
                    setSelected({index: arr[row][col] + 1, value: list[row][col]});
                }
                break;
            case "ArrowDown":
                row = getRow(index);
                col = getCol(index) - 1;
                if(row <= 8) {
                    setSelected({index: arr[row][col] + 1, value: list[row][col]});
                }
                break;
            case "ArrowLeft":
                row = getRow(index) - 1;
                col = getCol(index) - 2;
                if(col >= 0) {
                    setSelected({index: arr[row][col] + 1, value: list[row][col]});
                }
                break;
            default:
                break;
        }
    }

    return (
    <div className='sudoku-board' tabIndex={0} onKeyDown={handleKeyPress}>
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
