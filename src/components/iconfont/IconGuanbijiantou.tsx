/* tslint:disable */
/* eslint-disable */

import React, { CSSProperties, SVGAttributes, FunctionComponent } from 'react';
import { getIconColor } from './helper';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  size?: number;
  color?: string | string[];
}

const DEFAULT_STYLE: CSSProperties = {
  display: 'block',
};

const IconGuanbijiantou: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M481.834667 512L155.584 185.749333a21.333333 21.333333 0 0 1 30.165333-30.165333L512 481.834667 838.250667 155.584a21.333333 21.333333 0 0 1 30.165333 30.165333L542.165333 512l326.250667 326.250667a21.333333 21.333333 0 0 1-30.165333 30.165333L512 542.165333 185.749333 868.416a21.333333 21.333333 0 1 1-30.165333-30.165333L481.834667 512z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconGuanbijiantou.defaultProps = {
  size: 18,
};

export default IconGuanbijiantou;
