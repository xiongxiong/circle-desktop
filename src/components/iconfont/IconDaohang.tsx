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

const IconDaohang: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M915.797333 196.864c17.066667-39.168-10.602667-67.306667-50.133333-51.050667L138.026667 444.8c-40.96 16.832-37.952 56.277333 5.205333 66.773333l330.346667 80.341334-15.616-15.402667 77.76 301.205333a21.333333 21.333333 0 0 0 41.322666-10.666666l-77.781333-301.184a21.333333 21.333333 0 0 0-15.594667-15.402667L153.28 470.122667a24.298667 24.298667 0 0 1-6.186667-2.133334c1.941333 1.322667 4.138667 4.416 4.522667 9.322667 0.362667 4.906667-1.344 8.32-3.072 9.92 0.576-0.533333 2.517333-1.685333 5.674667-2.986667L881.92 185.301333a19.072 19.072 0 0 1 5.76-1.664 9.557333 9.557333 0 0 1-6.165333-3.178666 9.6 9.6 0 0 1-3.072-6.229334c0 0.768-0.512 2.773333-1.749334 5.610667L646.506667 708.352a21.333333 21.333333 0 0 0 39.125333 17.024L915.797333 196.864z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconDaohang.defaultProps = {
  size: 18,
};

export default IconDaohang;
