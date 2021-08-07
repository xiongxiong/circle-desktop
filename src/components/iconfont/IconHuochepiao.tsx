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

const IconHuochepiao: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M890.453333 901.226667a21.333333 21.333333 0 0 1 0.106667 30.122666l-1.493333 1.493334a21.269333 21.269333 0 0 1-30.122667-0.085334L736.832 810.666667H287.936l-122.112 122.090666a21.269333 21.269333 0 0 1-30.122667 0.085334l-1.493333-1.493334a21.333333 21.333333 0 0 1 0.064-30.122666L224.832 810.666667H171.050667c-23.552 0-42.666667-19.029333-42.666667-42.666667V170.666667c0-47.125333 38.08-85.333333 85.12-85.333334h597.76a85.248 85.248 0 0 1 85.12 85.333334v597.333333c0 23.552-18.986667 42.666667-42.666667 42.666667h-53.781333l90.538667 90.56zM171.072 768h682.666667V170.666667c0-23.530667-19.050667-42.666667-42.453334-42.666667h-597.76c-23.402667 0-42.453333 19.136-42.453333 42.666667v597.333333z m128-170.666667a42.666667 42.666667 0 1 1-0.042667 85.354667A42.666667 42.666667 0 0 1 299.050667 597.333333z m426.666667 0a42.666667 42.666667 0 1 1-0.042667 85.354667A42.666667 42.666667 0 0 1 725.717333 597.333333z m-42.538667 256c11.690667 0 21.184 9.536 21.184 21.290667a21.184 21.184 0 0 1-21.184 21.290667H341.546667a21.248 21.248 0 0 1-21.184-21.290667c0-11.84 9.493333-21.290667 21.184-21.290667h341.632zM171.050667 512h682.666666v42.666667h-682.666666v-42.666667z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconHuochepiao.defaultProps = {
  size: 18,
};

export default IconHuochepiao;
