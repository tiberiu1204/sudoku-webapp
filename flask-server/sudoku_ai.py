import time


class Solver:
    def __init__(self, board):
        self._board = board
        self._empty_squares = 0
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
        print(f"[BOARD] printing board...")
        for i in range(9):
            for j in range(9):
                print(self._board[i][j], end=" ")
            print()

    def _backtracking(self):
        empty_square = self._find_empty()
        if not empty_square:
            return True
        i, j = empty_square
        for val in range(1, 10):
            if self._move_is_valid(i, j, val):
                self._board[i][j] = val
                if self._backtracking():
                    return True
            self._board[i][j] = 0
        return False

    def solve(self):
        # print(f"[SOLVING] solving for {self._empty_squares} empty squares...")
        t = time.perf_counter()
        if self._backtracking():
            # print(f"[SOLVED] solution found in {round(time.perf_counter() - t, 4)} seconds")
            # self._print_board()
            return self._board
        # print(f"[NO VALID SOLUTION] no valid solution was found")
        return False
    


s = Solver([
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
s.solve()