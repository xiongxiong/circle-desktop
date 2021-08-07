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

const IconShuaxin: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M853.333333 768.064A426.112 426.112 0 0 1 512 938.666667C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667a21.333333 21.333333 0 0 1-42.666667 0c0-212.074667-171.925333-384-384-384S128 299.925333 128 512s171.925333 384 384 384a383.573333 383.573333 0 0 0 319.36-170.666667h-84.757333A21.248 21.248 0 0 1 725.333333 704c0-11.776 9.664-21.333333 21.269334-21.333333h128.128c5.866667 0 11.178667 2.346667 15.018666 6.186666l0.021334 0.106667c3.84 3.882667 6.229333 9.173333 6.229333 14.976v128.128c0 11.733333-9.472 21.269333-21.333333 21.269333-11.776 0-21.333333-9.664-21.333334-21.269333v-64z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconShuaxin.defaultProps = {
  size: 18,
};

export default IconShuaxin;
