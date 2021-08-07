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

const IconSaoyisao: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M149.333333 170.858667A21.546667 21.546667 0 0 1 170.858667 149.333333H384V106.666667H170.858667A64.213333 64.213333 0 0 0 106.666667 170.858667V384h42.666666V170.858667zM170.858667 874.666667A21.546667 21.546667 0 0 1 149.333333 853.141333V640H106.666667v213.141333A64.213333 64.213333 0 0 0 170.858667 917.333333H384v-42.666666H170.858667zM853.12 149.333333A21.546667 21.546667 0 0 1 874.666667 170.858667V384h42.666666V170.858667A64.213333 64.213333 0 0 0 853.141333 106.666667H640v42.666666h213.141333zM874.666667 853.141333A21.546667 21.546667 0 0 1 853.141333 874.666667H640v42.666666h213.141333A64.213333 64.213333 0 0 0 917.333333 853.141333V640h-42.666666v213.141333zM106.666667 490.666667h810.666666v42.666666H106.666667v-42.666666z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconSaoyisao.defaultProps = {
  size: 18,
};

export default IconSaoyisao;
