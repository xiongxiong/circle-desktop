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

const IconShibai2: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 938.666667C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667-191.018667 426.666667-426.666667 426.666667z m0-42.666667c212.074667 0 384-171.925333 384-384S724.074667 128 512 128 128 299.925333 128 512s171.925333 384 384 384z m-5.802667-419.968l105.685334-105.706667a21.205333 21.205333 0 0 1 30.08 0.106667 21.269333 21.269333 0 0 1 0.106666 30.08l-105.706666 105.685333 105.706666 105.685334a21.205333 21.205333 0 0 1-0.106666 30.08 21.269333 21.269333 0 0 1-30.08 0.106666l-105.685334-105.706666-105.685333 105.706666a21.205333 21.205333 0 0 1-30.08-0.106666 21.269333 21.269333 0 0 1-0.106667-30.08l105.706667-105.685334-105.706667-105.685333a21.205333 21.205333 0 0 1 0.106667-30.08 21.269333 21.269333 0 0 1 30.08-0.106667l105.685333 105.706667z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconShibai2.defaultProps = {
  size: 18,
};

export default IconShibai2;
