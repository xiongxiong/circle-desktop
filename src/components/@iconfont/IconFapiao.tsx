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

const IconFapiao: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M128 853.333333c0 0.064 768.064 0 768.064 0L896 170.666667H127.936L128 853.333333zM127.936 128h768.128C919.594667 128 938.666667 146.986667 938.666667 170.666667v682.666666c0 23.573333-19.029333 42.666667-42.602667 42.666667H127.936A42.56 42.56 0 0 1 85.333333 853.333333V170.666667c0-23.573333 19.029333-42.666667 42.602667-42.666667zM362.666667 298.666667v42.666666h298.666666v-42.666666H362.666667z m448 149.333333H213.333333v42.666667h597.333334v-42.666667z m-341.333334 128H213.333333v42.666667h256v-42.666667z m0 128H213.333333v42.666667h256v-42.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconFapiao.defaultProps = {
  size: 18,
};

export default IconFapiao;
