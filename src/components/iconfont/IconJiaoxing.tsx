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

const IconJiaoxing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M170.368 746.666667H149.333333A21.333333 21.333333 0 0 0 128 768.106667v21.12C128 801.109333 137.557333 810.666667 149.397333 810.666667h725.184c11.733333 0 21.397333-9.642667 21.397334-21.44v-21.12A21.312 21.312 0 0 0 874.730667 746.666667h-21.845334a63.957333 63.957333 0 0 1-63.957333-63.850667V405.12C788.906667 252.224 664.682667 128 511.637333 128c-153.173333 0-277.269333 124.053333-277.269333 277.12v277.696a64 64 0 0 1-64 63.850667z m0-42.666667a21.333333 21.333333 0 0 0 21.333333-21.184V405.12C191.701333 228.48 334.912 85.333333 511.637333 85.333333c176.618667 0 319.936 143.338667 319.936 319.786667v277.696c0 11.669333 9.557333 21.184 21.290667 21.184h21.845333A63.978667 63.978667 0 0 1 938.666667 768.106667v21.12A64.170667 64.170667 0 0 1 874.56 853.333333H149.397333A64.021333 64.021333 0 0 1 85.333333 789.226667v-21.12A64 64 0 0 1 149.333333 704h21.034667zM512 192a192 192 0 0 0-192 192 21.333333 21.333333 0 0 0 42.666667 0 149.333333 149.333333 0 0 1 149.333333-149.333333 21.333333 21.333333 0 0 0 0-42.666667zM234.666667 896h554.666666v42.666667H234.666667v-42.666667z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconJiaoxing.defaultProps = {
  size: 18,
};

export default IconJiaoxing;
