from sudoku_ai import Solver
from copy import deepcopy

class Sudoku:
    def __init__(self, board):
        self._board = board
        self._mistakes = 0
        self._solved_board = Solver(deepcopy(board)).solve()

    def move(self, row, col, val):
        if self._solved_board[row][col] == val and self._board[row][col] == 0:
            self._board[row][col] = val
            return True
        self._mistakes += 1
        return False

    def get_board(self):
        return deepcopy(self._board)
    
    def get_mistakes(self):
        return self._mistakes

s = Sudoku([
        [7, 8, 0, 4, 0, 0, 1, 2, 0],
        [6, 0, 0, 0, 7, 5, 0, 0, 9],
        [0, 0, 0, 6, 0, 1, 0, 7, 8],
        [0, 0, 7, 0, 4, 0, 2, 6, 0],
        [0, 0, 1, 0, 5, 0, 9, 3, 0],
        [9, 0, 4, 0, 6, 0, 0, 0, 5],
        [0, 7, 0, 3, 0, 0, 0, 1, 2],
        [1, 2, 0, 0, 0, 7, 4, 0, 0],
        [0, 4, 9, 2, 0, 6, 0, 0, 7]
    ])

while True:
    i, j, val = (int(x) for x in input().split(" "))
    print(s.move(i, j, val))