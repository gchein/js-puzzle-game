// Select all the tiles
const tiles = document.querySelectorAll('td');
let emptyTile = document.querySelector('.empty');
const solution = Array.from({ length: 15 }, (_, i) => i + 1);
// const solution = [1, 9, 2, 10, 3, 11, 4, 12, 5, 13, 14, 8, 7, 15, 6];

const isValidRowColumn = (value) => {
  return (value >= 1 && value <= 4);
};

const findAdjacentTile = (tileObj, rowOffset, colOffset) => {
  // Calculate the new row-column pair
  const newRow = tileObj.row + rowOffset;
  const newColumn = tileObj.column + colOffset;

  // If any of them is below 1 or above 4, it is not valid, and the function will return null
  if (isValidRowColumn(newRow) && isValidRowColumn(newColumn)) {
    return tiles[((newRow - 1) * 4 + (newColumn)) - 1];
  }

  return null;
};

const mapNeighbourTiles = (tile) => {
  const position = Array.prototype.indexOf.call(tiles, tile) + 1;
  // const arrayfrom = Array.from(tiles)

  const row = Math.ceil(position / 4);

  let column = position % 4;
  if (column === 0) { column = 4; }

  const tileObj = { row, column };

  const tileAbove = findAdjacentTile(tileObj, -1, 0);
  const tileRight = findAdjacentTile(tileObj, 0, 1);
  const tileBelow = findAdjacentTile(tileObj, 1, 0);
  const tileLeft = findAdjacentTile(tileObj, 0, -1);

  return [tileAbove, tileRight, tileBelow, tileLeft];
};

const canMove = (tile) => {
  // TODO: Check if a tile has an empty neighbour
  const neighbours = mapNeighbourTiles(emptyTile);

  return neighbours.includes(tile);
};

const moveTile = (element) => {
  // TOOD: Move the tile
  emptyTile.innerText = element.innerText;
  element.innerText = '';

  element.classList.add("empty");
  emptyTile.classList.remove("empty");

  emptyTile = document.querySelector('.empty');
};

const checkIfPlayerWins = () => {
  // TODO: Check if player has won

  const currentUserOrder = [];

  // for (const entry of tiles.entries()) {
  //   const element = entry[1].innerText
  //   currentUserOrder.push(parseInt(element, 10));
  // }

  tiles.forEach((tile) => {
    const value = tile.innerText;
    currentUserOrder.push(parseInt(value, 10));
  });
  currentUserOrder.pop();

  if (JSON.stringify(currentUserOrder) === JSON.stringify(solution)) {
    alert("You win! Nice job, brosef.");
  }
};

// Add event listener on each tile - Do not change the following
tiles.forEach((tile) => {
  tile.addEventListener('click', () => {
    if (canMove(tile)) {
      moveTile(tile);
      checkIfPlayerWins();
    }
  });
});
