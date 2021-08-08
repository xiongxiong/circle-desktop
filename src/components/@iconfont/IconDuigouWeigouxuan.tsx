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

const IconDuigouWeigouxuan: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 192c176.768 0 320 143.274667 320 320 0 176.768-143.274667 320-320 320-176.768 0-320-143.274667-320-320 0-176.768 143.274667-320 320-320z m0 41.28c-153.962667 0-278.72 124.757333-278.72 278.72S358.037333 790.72 512 790.72 790.72 665.962667 790.72 512 665.962667 233.28 512 233.28z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconDuigouWeigouxuan.defaultProps = {
  size: 18,
};

export default IconDuigouWeigouxuan;
