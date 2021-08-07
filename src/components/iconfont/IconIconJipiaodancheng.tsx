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

const IconIconJipiaodancheng: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M917.013333 572.330667a21.397333 21.397333 0 0 1-20.949333 25.024H127.893333a21.248 21.248 0 0 1-21.269333-21.333334c0-11.797333 9.664-21.354667 21.269333-21.354666h723.84l-91.605333-91.669334a21.248 21.248 0 0 1 0.064-30.122666c8.32-8.32 21.973333-8.213333 30.101333-0.064l120.810667 120.896c5.077333 5.077333 7.04 12.053333 5.909333 18.624z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconIconJipiaodancheng.defaultProps = {
  size: 18,
};

export default IconIconJipiaodancheng;
