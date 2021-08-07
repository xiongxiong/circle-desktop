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

const IconBiaodankongjianfuxuan: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M461.973333 586.325333l-105.642666-105.642666a21.248 21.248 0 0 0-30.122667 0.042666c-8.32 8.32-8.213333 21.973333-0.064 30.101334l120.810667 120.832a21.248 21.248 0 0 0 30.122666-0.085334l211.157334-211.157333a21.290667 21.290667 0 0 0 0-30.186667 21.397333 21.397333 0 0 0-30.250667 0.106667l-196.010667 195.989333z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
      <path
        d="M149.333333 874.602667L874.602667 874.666667 874.666667 149.397333 149.397333 149.333333 149.333333 874.602667zM106.666667 149.397333C106.666667 125.802667 125.909333 106.666667 149.397333 106.666667h725.205334C898.197333 106.666667 917.333333 125.909333 917.333333 149.397333v725.205334A42.794667 42.794667 0 0 1 874.602667 917.333333H149.397333A42.794667 42.794667 0 0 1 106.666667 874.602667V149.397333z"
        fill={getIconColor(color, 1, '#3D3D3D')}
      />
    </svg>
  );
};

IconBiaodankongjianfuxuan.defaultProps = {
  size: 18,
};

export default IconBiaodankongjianfuxuan;
