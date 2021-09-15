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

const IconShouqijiantouxiao: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M264.789333 627.626667a42.965333 42.965333 0 0 1-60.288 0 41.856 41.856 0 0 1 0-59.648l247.210667-244.608a85.930667 85.930667 0 0 1 120.576 0l247.210667 244.608a41.856 41.856 0 0 1 0 59.648 42.965333 42.965333 0 0 1-60.288 0L512 383.018667 264.789333 627.626667z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M512 1024c282.752 0 512-229.248 512-512S794.752 0 512 0 0 229.248 0 512s229.248 512 512 512z m0-85.333333C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667-191.018667 426.666667-426.666667 426.666667z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

IconShouqijiantouxiao.defaultProps = {
  size: 18,
};

export default IconShouqijiantouxiao;
