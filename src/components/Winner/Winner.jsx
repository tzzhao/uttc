import {Shape} from "../Shape/Shape";
import React, {Fragment} from "react";

export function Winner(props) {
  return <div className="winner-modal">
    <div className="winner-overlay" />
    <div className="winner-modal-container">
      <div className="winner-message">
        {props.winner === -2 ?
            <div>It's a draw !</div>
        : <Fragment><div className="shape-container"><Shape shape={props.winner} /></div>
            <div>Won !</div>
        </Fragment>}
      </div>
      <button onClick={props.startAgain}>New Game</button>
    </div>
  </div>;
}
