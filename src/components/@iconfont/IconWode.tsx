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

const IconWode: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M704 329.152C704 209.365333 622.848 128 512 128s-192 81.365333-192 201.152C320 454.762667 407.146667 554.666667 512 554.666667s192-99.904 192-225.514667z m42.666667 0C746.666667 476.714667 642.176 597.333333 512 597.333333s-234.666667-120.618667-234.666667-268.181333C277.333333 181.546667 381.824 85.333333 512 85.333333s234.666667 96.213333 234.666667 243.818667zM512.106667 640c408.96 0 404.864 256.512 404.864 256.512 3.093333 23.274667-13.482667 42.154667-37.098667 42.154667H144.32c-23.573333 0-41.088-19.136-37.077333-42.154667 0 0-4.096-256.512 404.864-256.512zM149.909333 896l0.064 3.861333-0.704 3.968c0.682667-3.882667-2.837333-7.829333-4.949333-7.829333H879.872c-2.154667 0-5.504 3.818667-5.205333 6.144l-0.426667-3.157333 0.064-3.157334c0-0.853333-0.128-3.349333-0.533333-7.125333a161.813333 161.813333 0 0 0-4.266667-23.082667 192.96 192.96 0 0 0-35.242667-71.104C780.330667 725.461333 678.634667 682.666667 512.106667 682.666667c-166.549333 0-268.224 42.794667-322.176 111.850666a192.96 192.96 0 0 0-35.242667 71.104c-2.176 8.426667-3.541333 16.192-4.266667 23.082667a81.045333 81.045333 0 0 0-0.512 7.296z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconWode.defaultProps = {
  size: 18,
};

export default IconWode;