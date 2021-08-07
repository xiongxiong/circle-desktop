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

const IconShibai: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667zM512 481.834667l-105.685333-105.706667a21.269333 21.269333 0 0 0-30.08 0.106667 21.205333 21.205333 0 0 0-0.106667 30.08L481.834667 512l-105.706667 105.685333a21.269333 21.269333 0 0 0 0.106667 30.08 21.205333 21.205333 0 0 0 30.08 0.106667L512 542.165333l105.685333 105.706667a21.269333 21.269333 0 0 0 30.08-0.106667 21.205333 21.205333 0 0 0 0.106667-30.08L542.165333 512l105.706667-105.685333a21.269333 21.269333 0 0 0-0.106667-30.08 21.205333 21.205333 0 0 0-30.08-0.106667L512 481.834667z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconShibai.defaultProps = {
  size: 18,
};

export default IconShibai;
