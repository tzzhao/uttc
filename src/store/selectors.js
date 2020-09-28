import {createSelector} from 'reselect';
import {DRAW, isFinished, isNeutralOrDraw, NEUTRAL, PLAYER_0, PLAYER_1} from "../utils/player";

const getGameState = state => state.gameState;
const getHistory = state => state.history;
const getCurrent = state => state.current;

export const getBigGridState = createSelector([getGameState], (gameState) => {
  return gameState.map(gridState => getWinner(gridState));
});

export const getPlayableGrids = createSelector([getHistory, getBigGridState, getCurrent], (history, bigGridState, current) => {
  if (history.length === 0 || current === -1) return [0,1,2,3,4,5,6,7,8];
  const lastPlay = history[current];
  if (bigGridState[lastPlay.cellId] === NEUTRAL) return [lastPlay.cellId];
  return bigGridState.reduce((acc, currentValue, index)=> currentValue === NEUTRAL ? [...acc, index] : acc, []);
});

export const getGameWinner = createSelector([getBigGridState], (bigGridState) => {
  const winner = getWinner(bigGridState);
  if (winner === DRAW) {
    const score0 = bigGridState.reduce((acc, currentValue) => acc + (currentValue === 0), 0);
    const score1 = bigGridState.reduce((acc, currentValue) => acc + (currentValue === 1), 0);
    if (score0 === score1) {
      return DRAW;
    } else if (score0 < score1) {
      return PLAYER_0;
    } else {
      return PLAYER_1;
    }
  }
  return winner;
});

export const hasGameFinished = createSelector([getGameWinner], winner => isFinished(winner));

const getWinner = (gridState => {
  // Check rows and columns
  for (let index = 0; index < 3; index++) {
    const row_0 = gridState[index * 3];
    const row_1 = gridState[index * 3 + 1];
    const row_2 = gridState[index * 3 + 2];
    const column_0 = gridState[index];
    const column_1 = gridState[index + 3];
    const column_2 = gridState[index + 6];
    if (!isNeutralOrDraw(row_0) && row_0 === row_1 && row_1 === row_2) {
      return row_0;
    }
    if (!isNeutralOrDraw(column_0) && column_0 === column_1 && column_1 === column_2) {
      return column_0;
    }
  }

  const centerCell = gridState[4];
  if (!isNeutralOrDraw(centerCell)) {
    // Check diagonals
    if (gridState[0] === centerCell && centerCell === gridState[8]) {
      return centerCell;
    }
    if (gridState[2] === centerCell && centerCell === gridState[6]) {
      return centerCell;
    }
  }

  // Return -1 if no winner
  return gridState.some(v => v === -1) ? NEUTRAL : DRAW;
});
