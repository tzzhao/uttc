import React from 'react';
import {Cell} from "../Cell/Cell";
import {playMoveAction} from "../../store/actions";
import {connect} from "react-redux";
import {getBigGridState} from "../../store/selectors";
import {Shape} from "../Shape/Shape";

let GridWithoutState = (props) => {
  const isBlackBackground = props.gridId % 2 === 0;
  const cells = [0,1,2,3,4,5,6,7,8].map(index => <Cell key={index} gridId={props.gridId} cellId={index} />);
  return (<div className="grid">
            {props.value === 0 || props.value === 1 ?
                <div className={`cells-container ${isBlackBackground ? 'bg-black' : 'bg-orange'}`}><Shape shape={props.value} isBlackBackground={isBlackBackground}/></div>
                : cells}
          </div>);
};

const mapStateToProps = (state, props) => {
  return {
    value: getBigGridState(state)[props.gridId]
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  playMove: () => {
    dispatch(playMoveAction(ownProps.gridId, ownProps.cellId))
  }
});

export const Grid = connect(mapStateToProps, mapDispatchToProps)(GridWithoutState);
