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

const IconWeizhixiangqing: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667zM512 746.666667c66.837333 0 192-160.704 192-281.045334C704 361.514667 617.941333 277.333333 512 277.333333s-192 84.202667-192 188.288C320 585.962667 445.162667 746.666667 512 746.666667z m0-42.666667c-11.093333 0-50.346667-31.36-82.730667-72.938667C388.053333 578.133333 362.666667 518.869333 362.666667 465.621333 362.666667 385.301333 429.44 320 512 320s149.333333 65.301333 149.333333 145.621333c0 53.248-25.386667 112.512-66.602666 165.44C562.325333 672.661333 523.093333 704 512 704z m0-192a42.666667 42.666667 0 1 0 0-85.333333 42.666667 42.666667 0 0 0 0 85.333333z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconWeizhixiangqing.defaultProps = {
  size: 18,
};

export default IconWeizhixiangqing;
