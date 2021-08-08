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

const IconGouwuche: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M64 149.333333h64c12.949333 0 25.450667 10.965333 27.178667 23.978667l74.026666 555.029333C233.706667 762.304 264.384 789.333333 298.453333 789.333333H874.666667v-42.666666H298.474667c-12.629333 0-25.28-11.136-26.986667-23.978667L197.461333 167.68C192.938667 133.461333 162.346667 106.666667 128 106.666667H64v42.666666z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
      <path
        d="M277.333333 234.666667h597.504c10.453333 0 16.853333 7.402667 15.36 17.792l-51.968 363.712c-1.813333 12.757333-14.634667 23.829333-27.669333 23.829333H341.333333a21.333333 21.333333 0 0 0 0 42.666667h469.226667c34.24 0 65.066667-26.666667 69.909333-60.458667l51.968-363.712c5.141333-36.053333-21.162667-66.496-57.6-66.496H277.333333a21.333333 21.333333 0 0 0 0 42.666667z"
        fill={getIconColor(color, 1, '#3D3D3D')}
      />
      <path
        d="M298.666667 896m-42.666667 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z"
        fill={getIconColor(color, 2, '#3D3D3D')}
      />
      <path
        d="M810.666667 896m-42.666667 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z"
        fill={getIconColor(color, 3, '#3D3D3D')}
      />
    </svg>
  );
};

IconGouwuche.defaultProps = {
  size: 18,
};

export default IconGouwuche;
