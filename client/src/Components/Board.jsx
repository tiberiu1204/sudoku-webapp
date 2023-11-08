import React, { useState, useEffect } from 'react'
import "./Board.css"

const SERVER = "http://localhost:5000"

function getRow(index) {
    return Math.floor((index - 1) / 27) * 3 + Math.floor((index - 1) % 9 / 3) + 1;
}

function getCol(index) {
    return Math.floor((index - 1) % 3) + Math.floor((index - 1) % 27  / 9) * 3 + 1;
}

function getSquare(index) {
    return Math.floor((index - 1) / 9) + 1;
}

function boardToRenderBoard(board) {
    let renderBoard = structuredClone(board);
    let index = 1;
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            renderBoard[getRow(index) - 1][getCol(index) - 1] = board[i][j];
            index++;
        }
    }
    return renderBoard;
}

const Tile = ({ index, selected, setSelected, value, isWrong = false }) => {

    function handleHighlight() {
        let square = getSquare(index);
        let row = getRow(index);
        let col = getCol(index);
        if(index === selected.index) {
            return "sudoku-selected-strong";
        }
        if(Math.abs(value) === Math.abs(selected.value) && value) {
            return "sudoku-selected-value";
        }
        if(square === getSquare(selected.index) || row === getRow(selected.index) || col === getCol(selected.index)) {
            return "sudoku-selected";
        }
        return "";
    }

    function displayValue() {
        if(value === 0) {
            return "";
        }
        if(value < 0) {
            return -value;
        }
        return value;
    }

    return (
    <div 
        className={`sudoku-tile ${handleHighlight()}`} 
        onClick={() => {
            setSelected({index: index, value: value});
        }}
        >
        <div className={`sudoku-tile-value ${value < 0 ? "sudoku-wrong" : ""}`}>{displayValue()}</div>
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
const changePermited = new Array(9);

export const Board = ({board, setBoard}) => {
    const [selected, setSelected] = useState(0);
    const [move, setMove] = useState(0);

    useEffect(() => {
        let index = 0;
        for(let i = 0; i < 9; i++) {
            arr[i] = new Array(9);
            changePermited[i] = new Array(9);
        }
        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {
                changePermited[i][j] = board[i][j] ? false : true
                arr[getRow(index + 1) - 1][getCol(index + 1) - 1] = index;
                index++;
            }
        }
    }, []);

    useEffect(() => {
        if(move === 0) {
            return;
        }
        const [row, col, value, moveIsValid] = move;
        if(!moveIsValid) {
            board[row][col] = -value;
        } else {
            board[row][col] = value
        }
        setSelected({ index: selected.index, value: value });
        setBoard(structuredClone(board));
    }, [move]);

    const handleKeyPress = e => {
        if(e.key === "\\") return;
        const { index } = selected;
        let row = getRow(index) - 1, col = getCol(index) - 1;
        if(!selected) return;
        switch(e.key) {
            case "ArrowUp":
                if(row - 1 >= 0) {
                    setSelected({index: arr[row - 1][col] + 1, value: board[row-1][col]});
                }
                break;
            case "ArrowRight":
                if(col + 1 < 9) {
                    setSelected({index: arr[row][col + 1] + 1, value: board[row][col+1]});
                }
                break;
            case "ArrowDown":
                if(row + 1 < 9) {
                    setSelected({index: arr[row + 1][col] + 1, value: board[row+1][col]});
                }
                break;
            case "ArrowLeft":
                if(col - 1 >= 0) {
                    setSelected({index: arr[row][col - 1] + 1, value: board[row][col-1]});
                }
                break;
            case "Delete":
            case "Backspace":
                if(!changePermited[row][col]) return;
                board[row][col] = 0;
                setBoard(structuredClone(board));
                setSelected({index: index, value: 0})
                break;
            default:
                break;
        }
        if("0123456789".search(e.key) !== -1) {
            const [row, col] = [getRow(selected.index) - 1, getCol(selected.index) - 1]; 
            if(!changePermited[row][col]) {
                return;
            }
            fetch(SERVER + "/validate", {
                method: "POST",
                body: JSON.stringify([row, col, Number(e.key)])
            }).then(
                    res => res.json()
                ).then(
                    moveIsValid => {
                        setMove([row, col, Number(e.key), moveIsValid])
                        return;
                    }
                );
        }
    }

    return (
    <div className='sudoku-board' tabIndex={0} onKeyDown={handleKeyPress}>
        {boardToRenderBoard(board).map((tiles, index) => {
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
