import time
from random import shuffle
from copy import deepcopy

class Solver:
    def __init__(self, board):
        self._board = board
        self._empty_squares = 0
        self._solutions = 0
        self._solution = None
        for i in range(9):
            self._empty_squares += board[i].count(0)

    def _move_is_valid(self, i, j, move):
        if self._board[i][j] != 0:
            return False
        for k in range(9):
            si, sj = i // 3 * 3 + k // 3, j // 3 * 3 + k % 3
            if self._board[i][k] == move or self._board[k][j] == move or self._board[si][sj] == move:
                return False
        return True

    def _find_empty(self):
        for i in range(9):
            for j in range(9):
                if self._board[i][j] == 0:
                    return i, j
        return False

    def _print_board(self):
        # print(f"[BOARD] printing board...")
        for i in range(9):
            for j in range(9):
                print(self._board[i][j], end=" ")
            print()

    def _backtracking(self, rand=False, generate=False):
        empty_square = self._find_empty()
        if not empty_square:
            self._solution = deepcopy(self._board)
            return True
        i, j = empty_square
        arr = list(range(1, 10))
        shuffle(arr) if rand else arr
        for val in arr:
            if self._solutions > 1:
                return False
            if self._move_is_valid(i, j, val):
                self._board[i][j] = val
                if self._backtracking(rand, generate):
                    if generate:
                        self._solutions = 1
                        return True
                    self._solutions += 1
            self._board[i][j] = 0
        return False

    def solve(self, rand=False, generate=False):
        # print(f"[SOLVING] solving for {self._empty_squares} empty squares...")
        t = time.perf_counter()
        self._backtracking(rand, generate)
        if self._solutions == 1:
            # print(f"[SOLVED] solution found in {round(time.perf_counter() - t, 4)} seconds")
            # self._print_board()
            return self._solution
        # print(f"[NO VALID SOLUTION] no valid solution was found")
        return False
    