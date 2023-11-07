from sudoku_ai import Solver
from copy import deepcopy
from random import shuffle
from time import time
from threading import Thread

class Sudoku:
    def __init__(self):
        self._board = generate_random_board()
        self._mistakes = 0
        self._solved_board = Solver(deepcopy(self._board)).solve()

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


def generate_valid_board():
    board = [[0] * 9 for _ in range(9)]
    s = Solver(board)
    board = s.solve(rand=True, generate=True)
    return board


def get_positions_list():
    positions = []
    for i in range(9):
        for j in range(9):
            positions.append((i, j))
    return positions

def generate_random_board(difficulty = 0):
    empty = 0
    if difficulty == 0:
        empty = 43   
    elif difficulty == 1:
        empty = 51
    else:
        empty = 56
    board = generate_valid_board()
    positions = get_positions_list()
    board_copy = deepcopy(board)    
    while empty:
        shuffle(positions)
        index = 0
        temp_empty = empty
        while empty and index < len(positions):
            i, j = positions[index]
            index += 1
            temp = board[i][j]
            board[i][j] = 0
            if not Solver(board).solve():
                board[i][j] = temp
                continue
            empty -= 1
        if empty:
            empty = temp_empty
            board = deepcopy(board_copy)
    return board

print(generate_random_board(1))