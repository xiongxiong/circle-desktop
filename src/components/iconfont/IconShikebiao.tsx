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

const IconShikebiao: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M725.333333 917.333333a192 192 0 1 0 0-384 192 192 0 0 0 0 384z m0 42.666667c-129.6 0-234.666667-105.066667-234.666666-234.666667s105.066667-234.666667 234.666666-234.666666 234.666667 105.066667 234.666667 234.666666-105.066667 234.666667-234.666667 234.666667zM170.666667 128h682.666666v320h42.666667V106.517333c0-11.52-9.557333-21.184-21.333333-21.184H149.333333c-11.626667 0-21.333333 9.557333-21.333333 21.376v810.581334C128 929.066667 137.557333 938.666667 149.333333 938.666667h298.666667v-42.666667H170.666667V128z m128 213.333333h384v42.666667H298.666667v-42.666667z m0 128h213.333333v42.666667H298.666667v-42.666667z m0 128h128v42.666667h-128v-42.666667z m448 0a21.333333 21.333333 0 0 0-42.666667 0v128a21.333333 21.333333 0 0 0 10.368 18.282667l106.666667 64a21.333333 21.333333 0 0 0 21.930666-36.565333L746.666667 713.237333V597.333333z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconShikebiao.defaultProps = {
  size: 18,
};

export default IconShikebiao;
