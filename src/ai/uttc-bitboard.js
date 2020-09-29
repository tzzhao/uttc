export const winningMasks = [
    // rows
    0b111000000,
    0b000111000,
    0b000000111,
    // columns
    0b100100100,
    0b010010010,
    0b001001001,
    // diagonals
    0b100010001,
    0b001010100
];

export const cellIdToBitboardId = [0,1,2,3,4,5,6,7,8].map(val => 1 << val);
export const bitboardIds = Object.values(cellIdToBitboardId);
export const bitboardIdToCellId = cellIdToBitboardId.reduce((dict, currentValue, index) => ({...dict, [currentValue]: index}), {});
