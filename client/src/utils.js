export function getRow(index) {
    return (
      Math.floor((index - 1) / 27) * 3 + Math.floor(((index - 1) % 9) / 3) + 1
    );
  }
  
export function getCol(index) {
    return (
      Math.floor((index - 1) % 3) + Math.floor(((index - 1) % 27) / 9) * 3 + 1
    );
  }
  
export function getSquare(index) {
    return Math.floor((index - 1) / 9) + 1;
  }

export function boardToRenderBoard(board) {
    let renderBoard = structuredClone(board);
    let index = 1;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        renderBoard[getRow(index) - 1][getCol(index) - 1] = board[i][j];
        index++;
      }
    }
    return renderBoard;
  }