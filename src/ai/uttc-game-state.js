import {cellIdToBit, winningMasksDict} from "./uttc-bitboard";

const UttcGameState = function (state, nextPlayer, lastCellId) {
  this.state = convertState(state);
  this.nextPlayer = nextPlayer;
  this.lastCell = cellIdToBit[lastCellId];
};

UttcGameState.prototype.getNextMoves = function () {
  if (typeof this.lastCell === 'undefined') {
    return Object.values(cellIdToBit);
  }
  const nextGridState = this.state.gridState[2][this.lastCell];
  if ((this.state.globalState[2] && this.lastCell) !== this.lastCell && nextGridState !== 0b111111111) {
    return Object.values(cellIdToBit).reduce((nextMoves, currentMove) => {
      if ((currentMove && nextGridState) !== currentMove) {
        nextMoves.push(currentMove);
        return nextMoves;
      }
      return nextMoves;
    }, []);
  }
};

UttcGameState.prototype.playMove = function (grid, cell) {
  const player = this.nextPlayer;
  this.state.gridState[player][grid] |= cell;
  this.lastCell = cell;
  this.nextPlayer = 1 - player;
};

const convertState = (state) => {
  const player0State = {};
  const player1State = {};
  const neutralState = {};
  let player0GlobalState = 0;
  let player1GlobalState = 0;
  let neutralGlobalState = 0;
  state.forEach((gridState, index) => {
    let player0GridState = 0;
    let player1GridState = 0;
    let neutralGridState = 0;
    gridState.reverse().forEach((cellState, cellIndex) => {
      if (cellState === 0) {
        player0GridState |= cellIdToBit[cellIndex];
        neutralGridState |= cellIdToBit[cellIndex];
      }
      if (cellState === 1) {
        player1GridState |= cellIdToBit[cellIndex];
        neutralGridState |= cellIdToBit[cellIndex];
      }
    });
    const bit = cellIdToBit[index];
    if (winningMasksDict[player0GridState]) {
      player0GlobalState |= bit;
      neutralGlobalState |= bit;
    }
    if (winningMasksDict[player1GridState]) {
      player1GlobalState |= bit;
      neutralGlobalState |= bit;
    }
    player0State[bit] = player0GridState;
    player1State[bit] = player1GridState;
    neutralState[bit] = neutralGridState;

  });
  return {
    gridState: [player0State, player1State, neutralState],
    globalState: [player0GlobalState, player1GlobalState, neutralGlobalState]
  }
};
