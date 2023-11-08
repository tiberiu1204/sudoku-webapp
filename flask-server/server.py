from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from sudoku import Sudoku
from json import loads

CLIENT = "http://localhost:3000"

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": CLIENT}})

game = Sudoku()

@app.route("/board", methods=["GET", "POST", "OPTIONS"])
def board():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()
    else:
        return _corsify_actual_response(jsonify(game.generate_game_board(loads(request.data))))

@app.route("/validate", methods=["POST", "OPTIONS"])
def validate():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()
    else:
        row, col, val = loads(request.data)
        return _corsify_actual_response(jsonify(game.validate_move(row, col, val)))

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", CLIENT)
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", CLIENT)
    return response

if __name__ == "__main__":
    app.run(debug=True)
