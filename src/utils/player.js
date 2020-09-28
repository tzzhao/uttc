export const PLAYER_0 = 0;
export const PLAYER_1 = 1;
export const NEUTRAL = -1;
export const DRAW = -2;

export const isNeutralOrDraw = (id) => id === NEUTRAL || id === DRAW;
export const isFinished = (id) => id !== NEUTRAL;
