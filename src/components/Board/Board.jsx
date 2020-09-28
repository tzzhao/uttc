import React from 'react';
import {Grid} from "../Grid/Grid";

export function Board(props) {
  const grids = [0,1,2,3,4,5,6,7,8].map(index => <div key={index} className="grid-container"><Grid gridId={index} /></div>);
  return grids;
}
