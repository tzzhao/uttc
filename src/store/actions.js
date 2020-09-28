export const PLAY_MOVE_ACTION_TYPE = 'Play Move Action';

export function playMoveAction(gridId, cellId) {
  return {type: PLAY_MOVE_ACTION_TYPE, payload: {gridId, cellId}};
}


export const RESET_ACTION_TYPE = 'Reset game state Action';
export function resetAction() {
  return {type: RESET_ACTION_TYPE};
}

export const PREVIOUS_ACTION_TYPE = 'Previous Action';
export function previousAction() {
  return {type: PREVIOUS_ACTION_TYPE};
}

export const NEXT_ACTION_TYPE = 'Next Action';
export function nextAction() {
  return {type: NEXT_ACTION_TYPE};
}
