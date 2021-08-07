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

const IconJinrujiantou: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M612.266667 514.133333c0-2.133333 0-2.133333 0 0L369.066667 755.2c-8.533333 8.533333-8.533333 21.333333 0 29.866667 8.533333 8.533333 21.333333 8.533333 29.866666 0l243.2-243.2c17.066667-17.066667 17.066667-42.666667 0-57.6L401.066667 241.066667c-8.533333-8.533333-21.333333-8.533333-29.866667 0-8.533333 8.533333-8.533333 21.333333 0 29.866666l241.066667 243.2z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconJinrujiantou.defaultProps = {
  size: 18,
};

export default IconJinrujiantou;
