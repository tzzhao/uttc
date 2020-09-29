import {cellIdToBitboardId, bitboardIds, winningMasks, winningMasksDict} from "./uttc-bitboard";

const UttcGameState = function (uiState, nextPlayer, lastCellUiId) {
  if (uiState) {
    this.state = convertState(uiState);
  }
  this.nextPlayer = nextPlayer;
  this.lastCell = cellIdToBitboardId[lastCellUiId];
};

UttcGameState.prototype.getNextMoves = function () {
  const globalGridOccupation = this.state.globalState[2];
  const expectedNextGridState = this.state.gridState[2][this.lastCell];
  const nextMoves = [];
  if (this.lastCell && isMoveAvailable(globalGridOccupation, this.lastCell) && isFullGrid(expectedNextGridState)) {
    return bitboardIds.reduce((nextMoves, move) => {
      if (isMoveAvailable(move, expectedNextGridState)) {
        nextMoves.push({grid: this.lastCell, cell: move});
      }
      return nextMoves;
    }, []);
  } else {
    for (const grid of bitboardIds) {
      if (isMoveAvailable(globalGridOccupation, grid)) {
        const gridOccupation = this.state.gridState[grid];
        for (const cell of bitboardIds) {
          if (isMoveAvailable(gridOccupation, cell)) {
            nextMoves.push({grid, cell});
          }
        }
      }
    }
    return nextMoves;
  }
};

UttcGameState.prototype.playMove = function({grid, cell}) {
  this.state.gridState[this.nextPlayer][grid] &= cell;
  this.state.gridState[2][grid] &= cell;
  if (isWinningState(this.state.gridState[this.nextPlayer][grid])) {
    this.state.globalState[this.nextPlayer][grid] |= grid;
    this.state.globalState[2][grid] |= grid;
  }
  if (areAllMovedPlayed(this.state.gridState[this.nextPlayer][grid], this.state.gridState[1-this.nextPlayer][grid])) {
    this.state.globalState[2][grid] |= grid;
  }
  this.lastCell = cell;
  this.nextPlayer = 1 - this.nextPlayer;
};

UttcGameState.prototype.cloneState = function() {
  const clone = {
    state: {
      gridState: this.gridState.map(playerGrids => [...playerGrids]),
      globalState: [...this.globalState]
    },
    lastCell: this.lastCell,
    nextPlayer: this.nextPlayer
  };
  Object.setPrototypeOf(clone, this);
  return clone;
};

UttcGameState.prototype.getWinner = function() {
  if (isWinningState(this.globalState[1 - this.nextPlayer])) {
    // current player wins
    return 1 - this.nextPlayer;
  } else if (isFullGrid(this.globalState[2])) {
    const player0Score = getScore(this.globalState[0]);
    const player1Score = getScore(this.globalState[1]);
    if (player0Score === player1Score) {
      return -2; // draw
    } else {
      return +(player0Score < player1Score);
    }
  } else { // No winner
    return -1;
  }
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
        player0GridState |= cellIdToBitboardId[cellIndex];
        neutralGridState |= cellIdToBitboardId[cellIndex];
      }
      if (cellState === 1) {
        player1GridState |= cellIdToBitboardId[cellIndex];
        neutralGridState |= cellIdToBitboardId[cellIndex];
      }
    });
    const bit = cellIdToBitboardId[index];
    if (isWinningState(player0GridState)) {
      player0GlobalState |= bit;
      neutralGlobalState |= bit;
    }
    if (isWinningState(player1GridState)) {
      player1GlobalState |= bit;
      neutralGlobalState |= bit;
    }

    if (areAllMovedPlayed(player1GridState, player0GridState)) {
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

function getScore(state) {
  let score = 0;
  while (state) {
    score += (state & 1);
    state >>= 1;
  }
}

function isWinningState(state) {
  return winningMasks.some(mask => (state & mask) === mask);
}

function isMoveAvailable(state, biboardId) {
  return (state & biboardId) !== biboardId;
}

function areAllMovedPlayed(state1, state2) {
  return isFullGrid(state1 | state2);
}

function isFullGrid(state) {
  return state === 0b111111111;
}
