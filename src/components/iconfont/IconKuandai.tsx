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

const IconKuandai: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M234.666667 938.666667a21.333333 21.333333 0 0 1 0-42.666667h554.666666a21.333333 21.333333 0 0 1 0 42.666667H234.666667zM106.666667 191.808A63.829333 63.829333 0 0 1 170.666667 128h682.666666a64 64 0 0 1 64 63.808V704.213333A63.829333 63.829333 0 0 1 853.333333 768H170.666667a64 64 0 0 1-64-63.808V191.786667z m42.666666 0V704.213333A21.333333 21.333333 0 0 0 170.666667 725.333333h682.666666c11.861333 0 21.333333-9.429333 21.333334-21.141333V191.786667A21.333333 21.333333 0 0 0 853.333333 170.666667H170.666667c-11.861333 0-21.333333 9.429333-21.333334 21.141333zM149.333333 597.333333v-42.666666h725.333334v42.666666H149.333333z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconKuandai.defaultProps = {
  size: 18,
};

export default IconKuandai;
