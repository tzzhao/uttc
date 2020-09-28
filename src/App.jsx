import React from 'react';
import './App.css';
import {Board} from "./components/Board/Board";
import {nextAction, previousAction, resetAction} from "./store/actions";
import {getGameWinner} from "./store/selectors";
import {connect} from "react-redux";
import {isFinished} from "./utils/player";
import {Winner} from "./components/Winner/Winner";

let App = ({startAgain, previousAction, nextAction, ...props}) => {
  return (
      <div className="app-container">
        <div className="header"><h1>Ultimate Tic Tac Toe</h1></div>
        <div className="App">
          <Board />
        </div>
        <div className="header">
          <div className="button-group">
            <button onClick={startAgain}>New Game</button>
            <button onClick={previousAction}>Undo move</button>
            <button onClick={nextAction}>Redo move</button>
          </div>
        </div>
        {isFinished(props.winner) ? <Winner startAgain={startAgain} winner={props.winner} /> : null}
      </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startAgain: () => dispatch(resetAction()),
  previousAction: () => dispatch(previousAction()),
  nextAction: () => dispatch(nextAction())
});

const mapStateToProps = (state) => ({
  winner: getGameWinner(state)
});

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
