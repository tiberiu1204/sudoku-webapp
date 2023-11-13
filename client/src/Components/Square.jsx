import Tile from "./Tile";

const Square = ({ tiles, index, selected, setSelected }) => {
  return (
    <div className="sudoku-square">
      {tiles.map((num, ind) => {
        return (
          <Tile
            key={ind}
            value={num}
            index={index * 9 + ind + 1}
            selected={selected}
            setSelected={setSelected}
          ></Tile>
        );
      })}
    </div>
  );
};

export default Square;
