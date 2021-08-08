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

const IconDangdiwanle: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 640H128v277.333333a21.333333 21.333333 0 0 1-42.666667 0V127.829333C85.333333 104.362667 104.384 85.333333 127.850667 85.333333h362.922666A63.936 63.936 0 0 1 554.666667 149.12V192h320.128A63.936 63.936 0 0 1 938.666667 255.786667v427.093333A63.872 63.872 0 0 1 874.794667 746.666667H575.872A63.936 63.936 0 0 1 512 682.88V640zM128 128v469.333333h384V149.12a21.269333 21.269333 0 0 0-21.226667-21.12H128z m746.794667 106.666667H554.666667v448.213333c0 11.562667 9.557333 21.12 21.205333 21.12h298.922667a21.205333 21.205333 0 0 0 21.205333-21.12V255.786667a21.269333 21.269333 0 0 0-21.205333-21.12z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconDangdiwanle.defaultProps = {
  size: 18,
};

export default IconDangdiwanle;
