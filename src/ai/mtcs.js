export const Node = function(gameState, move, parentNode) {
  this.parent = parentNode;
  this.move = move;
  this.player = gameState.nextPlayer;
  this.nextMoves = gameState.getNextMoves();
  this.children = [];
  this.score = 0;
  this.terminal = this.nextMoves.length === 0;
  this.expanded = this.terminal;
};

Node.prototype.expand = function() {

};

Node.prototype.utcSelection = function() {

};
