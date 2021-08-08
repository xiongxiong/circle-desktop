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

const IconWifi: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M604.437333 760.896a92.437333 92.437333 0 1 0-184.874666 0 92.437333 92.437333 0 0 0 184.874666 0z m-142.208 0a49.770667 49.770667 0 1 1 99.541334 0 49.770667 49.770667 0 0 1-99.541334 0z m49.770667-234.666667c-63.061333 0-122.24 25.024-165.930667 68.714667a21.333333 21.333333 0 1 0 30.165334 30.186667A191.296 191.296 0 0 1 512 568.896c51.626667 0 99.968 20.437333 135.765333 56.234667a21.333333 21.333333 0 0 0 30.165334-30.186667A233.962667 233.962667 0 0 0 512 526.229333z m0-177.792c-110.848 0-214.826667 43.968-291.626667 120.810667a21.333333 21.333333 0 1 0 30.144 30.165333A368.490667 368.490667 0 0 1 512 391.104c99.413333 0 192.554667 39.402667 261.482667 108.309333a21.333333 21.333333 0 0 0 30.165333-30.165333A411.136 411.136 0 0 0 512 348.437333zM512 170.666667a588.330667 588.330667 0 0 0-417.344 172.864 21.333333 21.333333 0 1 0 30.165333 30.186666A545.664 545.664 0 0 1 512 213.333333c147.2 0 285.141333 58.346667 387.2 160.384a21.333333 21.333333 0 1 0 30.144-30.186666A588.330667 588.330667 0 0 0 512 170.666667z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconWifi.defaultProps = {
  size: 18,
};

export default IconWifi;
