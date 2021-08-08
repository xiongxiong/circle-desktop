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

const IconZhekou: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M128 449.792c0 12.373333 9.002667 34.133333 17.706667 42.837333L574.037333 920.96c-0.042667-0.021333 346.837333-346.794667 346.837334-346.794667L492.629333 145.706667c-8.618667-8.64-30.528-17.706667-42.837333-17.706667H128.149333L128 449.792zM85.333333 128.149333C85.333333 104.512 104.426667 85.333333 128.149333 85.333333h321.642667c23.637333 0 56.405333 13.589333 73.024 30.208l428.309333 428.309334c16.682667 16.682667 16.64 43.754667-0.064 60.48L604.330667 951.061333a42.816 42.816 0 0 1-60.48 0.064L115.541333 522.816C98.858667 506.133333 85.333333 473.514667 85.333333 449.792V128.149333zM320 426.666667a106.666667 106.666667 0 1 1 0-213.333334 106.666667 106.666667 0 0 1 0 213.333334z m0-42.666667a64 64 0 1 0 0-128 64 64 0 0 0 0 128z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconZhekou.defaultProps = {
  size: 18,
};

export default IconZhekou;
