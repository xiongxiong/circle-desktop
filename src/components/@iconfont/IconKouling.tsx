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

const IconKouling: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M374.528 687.658667l90.56 90.538666a21.248 21.248 0 0 1-0.042667 30.144 21.312 21.312 0 0 1-30.122666 0.042667l-90.56-90.56-138.410667 138.432a21.226667 21.226667 0 0 1-30.101333-0.064 21.248 21.248 0 0 1-0.064-30.122667l313.386666-313.386666c-91.264-100.48-88.384-256 8.64-353.002667 99.968-99.968 262.058667-99.968 362.026667 0 99.968 99.989333 99.968 262.08 0 362.026667-92.757333 92.778667-238.976 99.477333-339.456 20.117333l-145.856 145.834667z m153.450667-196.096c83.306667 83.306667 218.389333 83.306667 301.696 0 83.306667-83.328 83.306667-218.389333 0-301.717334-83.306667-83.306667-218.389333-83.306667-301.696 0-83.328 83.328-83.328 218.389333 0 301.717334z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconKouling.defaultProps = {
  size: 18,
};

export default IconKouling;
