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

const IconPailie: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M386.133333 904.533333c-12.8 0-21.333333-8.533333-21.333333-21.333333v-661.333333L192 394.666667c-8.533333 8.533333-21.333333 8.533333-29.866667 0-8.533333-8.533333-8.533333-21.333333 0-29.866667l209.066667-211.2c6.4-4.266667 14.933333-6.4 23.466667-4.266667 8.533333 4.266667 12.8 10.666667 12.8 19.2v714.666667c0 12.8-8.533333 21.333333-21.333334 21.333333z m266.666667 0c-2.133333 0-6.4 0-8.533333-2.133333-8.533333-4.266667-12.8-10.666667-12.8-19.2V168.533333c0-12.8 8.533333-21.333333 21.333333-21.333333s21.333333 8.533333 21.333333 21.333333V832l172.8-172.8c8.533333-8.533333 21.333333-8.533333 29.866667 0 8.533333 8.533333 8.533333 21.333333 0 29.866667l-209.066667 211.2c-4.266667 2.133333-8.533333 4.266667-14.933333 4.266666z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconPailie.defaultProps = {
  size: 18,
};

export default IconPailie;
