import React, { useState } from 'react';
import Cell from './Cell';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 7, ncols = 7, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows wide/ncols high, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < ncols; y++) {
      let col = [];
      for (let x = 0; x < nrows; x++) {
        col.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(col);
    }

    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every((row) => row.every((cell) => !cell));
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split('-').map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const newOldBoard = oldBoard.map((r) => [...r]);

      // TODO: in the copy, flip this cell and the cells around it
      // adding & subtracting to the x,y coords
      flipCell(y, x, newOldBoard);
      flipCell(y - 1, x, newOldBoard);
      flipCell(y + 1, x, newOldBoard);
      flipCell(y, x - 1, newOldBoard);
      flipCell(y, x + 1, newOldBoard);

      // TODO: return the copy
      return newOldBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return (
      <div>
        <h1>You win!</h1>
      </div>
    );
  }

  // make table board
  let tableBoard = [];
  for (let y = 0; y < ncols; y++) {
    let col = [];
    for (let x = 0; x < nrows; x++) {
      let coord = `${x}-${y}`;
      col.push(<Cell key={coord} isLit={board[x][y]} flipCellsAroundMe={() => flipCellsAround(coord)} />);
    }
    tableBoard.push(<tr key={y}>{col}</tr>);
  }
  return (
    <>
      <h1>Lights Out</h1>
      <p>How to win? make all cells gray</p>
      <table className='Board'>
        <tbody>{tableBoard}</tbody>
      </table>
    </>
  );
}

export default Board;
