import React from 'react';
import {playMoveAction} from "../../store/actions";
import {connect} from "react-redux";
import {getPlayableGrids, hasGameFinished} from "../../store/selectors";
import {Shape} from "../Shape/Shape";

const CellWithoutStore = (props) => {
  const isBlackBackground = props.gridId % 2 === 0;
  return (<div className="cell-container">
        <div className={`cell ${isBlackBackground ? 'bg-black' : 'bg-orange'} ${props.isClickable ? 'clickable' : ''}`}
             onClick={() => props.isClickable && props.playMove()}>
          {props.value !== -1 ? <Shape shape={props.value} isBlackBackground={isBlackBackground}/>
          : props.isClickable ? <Shape shape={props.nextPlayer} isBlackBackground={isBlackBackground}/>
          : null}
        </div>
      </div>);
};

const mapStateToProps = (state, props) => {
  const value = state.gameState[props.gridId][props.cellId];
  return {
    isClickable: getPlayableGrids(state).some(val => val === props.gridId && value === -1) && !hasGameFinished(state),
    value,
    nextPlayer: state.nextPlayer
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  playMove: () => {
      dispatch(playMoveAction(ownProps.gridId, ownProps.cellId))
  }
});

export const Cell = connect(mapStateToProps, mapDispatchToProps)(CellWithoutStore);
