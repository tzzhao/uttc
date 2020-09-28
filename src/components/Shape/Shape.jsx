import React from "react";

export const CIRCLE = 0;
export const CROSS = 1;
const shape = ['circle', 'cross'];

export const Shape = (props) => (
    <img src={`${process.env.PUBLIC_URL}/assets/${shape[props.shape]}_${props.isBlackBackground ? 'orange' : 'black'}.svg`} />
);
