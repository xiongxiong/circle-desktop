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

const IconDuigouzhong: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M501.504 170.666667c182.741333 0 330.816 148.117333 330.816 330.837333 0 182.741333-148.117333 330.816-330.816 330.816C318.72 832.32 170.666667 684.202667 170.666667 501.504 170.666667 318.72 318.784 170.666667 501.504 170.666667z m0 42.666666C342.336 213.333333 213.333333 342.314667 213.333333 501.504c0 159.146667 128.981333 288.149333 288.170667 288.149333 159.146667 0 288.149333-128.981333 288.149333-288.149333C789.653333 342.336 660.693333 213.333333 501.504 213.333333z m144.064 150.549334a25.152 25.152 0 0 1 36.053333 35.050666l-218.666666 224.896a25.152 25.152 0 0 1-35.242667 0.789334l-106.197333-99.968a25.152 25.152 0 1 1 34.453333-36.608l88.405333 83.2 201.194667-207.36z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconDuigouzhong.defaultProps = {
  size: 18,
};

export default IconDuigouzhong;
