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

const IconDianshiji: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M533.333333 725.333333v128h156.949334c7.573333 0 13.717333 9.557333 13.717333 21.333334s-6.144 21.333333-13.717333 21.333333H333.717333c-7.573333 0-13.717333-9.557333-13.717333-21.333333s6.144-21.333333 13.717333-21.333334H490.666667v-128H170.666667a85.333333 85.333333 0 0 1-85.333334-85.333333V213.333333a85.333333 85.333333 0 0 1 85.333334-85.333333h682.666666a85.333333 85.333333 0 0 1 85.333334 85.333333v426.666667a85.333333 85.333333 0 0 1-85.333334 85.333333H533.333333zM170.666667 170.666667a42.666667 42.666667 0 0 0-42.666667 42.666666v426.666667a42.666667 42.666667 0 0 0 42.666667 42.666667h682.666666a42.666667 42.666667 0 0 0 42.666667-42.666667V213.333333a42.666667 42.666667 0 0 0-42.666667-42.666666H170.666667z m512 405.333333c0-11.861333 9.472-21.333333 21.12-21.333333h85.76a21.333333 21.333333 0 0 1 21.12 21.333333c0 11.861333-9.472 21.333333-21.12 21.333333h-85.76a21.333333 21.333333 0 0 1-21.12-21.333333z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconDianshiji.defaultProps = {
  size: 18,
};

export default IconDianshiji;
