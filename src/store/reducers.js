import {PREVIOUS_ACTION_TYPE, PLAY_MOVE_ACTION_TYPE, RESET_ACTION_TYPE, NEXT_ACTION_TYPE} from "./actions";
import {INITIAL_STATE} from "./state";
import {NEUTRAL} from "../utils/player";

export const reducers = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case PLAY_MOVE_ACTION_TYPE:
      const {gridId, cellId} = action.payload;
      return getUpdatedState(state, gridId, cellId);
    case RESET_ACTION_TYPE:
      return INITIAL_STATE;
    case PREVIOUS_ACTION_TYPE:
      return getPreviousState(state);
    case NEXT_ACTION_TYPE:
      return getNextState(state);
    default:
      return state;
  }
};

const getUpdatedState = (state, gridId, cellId) => {
  const nextPlayer = state.nextPlayer;
  const newGameState = state.gameState.map(gridState => [...gridState]);
  newGameState[gridId][cellId] = nextPlayer;
  const current = state.current;
  const history = state.history.slice(0, current + 1);
  history.push({gridId, cellId});
  const newState = {...state, nextPlayer: 1 - nextPlayer, gameState: newGameState, history, current: current + 1};
  return newState;
};

const getPreviousState = (state) => {
  const currentHistory = state.history;
  const current = state.current;
  if (currentHistory.length === 0 || current < 0) {
    return state;
  }
  const newGameState = state.gameState.map(gridState => [...gridState]);
  const lastMove = currentHistory[current];
  newGameState[lastMove.gridId][lastMove.cellId] = NEUTRAL;
  return {...state, nextPlayer: 1 - state.nextPlayer, gameState: newGameState, current: current - 1};
};

const getNextState = (state) => {
  if (state.history.length <= state.current + 1) {
    return state;
  }
  const newGameState = state.gameState.map(gridState => [...gridState]);
  const nextMove = state.history[state.current + 1];
  newGameState[nextMove.gridId][nextMove.cellId] = state.nextPlayer;
  return {...state, nextPlayer: 1 - state.nextPlayer, gameState: newGameState, current: state.current + 1}
};
