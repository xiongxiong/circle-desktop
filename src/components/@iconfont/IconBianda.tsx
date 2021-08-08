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

const IconBianda: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M170.666667 822.528V618.666667a21.333333 21.333333 0 0 0-42.666667 0v256a21.333333 21.333333 0 0 0 21.333333 21.333333h256a21.333333 21.333333 0 0 0 0-42.666667H200.213333L463.573333 589.973333a21.333333 21.333333 0 0 0-30.165333-30.165333L170.666667 822.528zM853.333333 201.472L590.592 464.192a21.333333 21.333333 0 1 1-30.165333-30.165333L823.786667 170.666667H618.666667a21.333333 21.333333 0 0 1 0-42.666667h256a21.333333 21.333333 0 0 1 21.333333 21.333333v256a21.333333 21.333333 0 0 1-42.666667 0V201.472z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconBianda.defaultProps = {
  size: 18,
};

export default IconBianda;
