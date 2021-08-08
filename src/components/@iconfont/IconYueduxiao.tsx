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

const IconYueduxiao: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 923.136c-372.352 0-512-418.901333-512-418.901333S139.648 85.333333 512 85.333333s512 418.901333 512 418.901334-139.648 418.986667-512 418.901333z m0-85.333333c296.533333 0.042667 407.722667-333.568 407.722667-333.568S808.490667 170.666667 512 170.666667c-296.533333 0-407.722667 333.568-407.722667 333.568S215.509333 837.802667 512 837.802667z m75.392-570.538667a128 128 0 1 0 169.344 169.386667 256 256 0 1 1-169.344-169.344z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconYueduxiao.defaultProps = {
  size: 18,
};

export default IconYueduxiao;
