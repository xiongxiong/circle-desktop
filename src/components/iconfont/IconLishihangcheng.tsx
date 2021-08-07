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

const IconLishihangcheng: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M938.666667 448V192.042667A42.666667 42.666667 0 0 0 896.042667 149.333333H768v42.666667l128 0.042667V405.333333H128V192.042667L256 192V149.333333H127.957333A42.56 42.56 0 0 0 85.333333 192.042667v703.914666A42.666667 42.666667 0 0 0 127.936 938.666667H490.666667v-42.688l-362.666667-0.021334V448h810.666667zM298.666667 85.333333h42.666666v170.666667h-42.666666V85.333333z m384 0h42.666666v170.666667h-42.666666V85.333333zM384 149.333333h256v42.666667H384V149.333333z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
      <path
        d="M746.666667 917.333333a170.666667 170.666667 0 1 0 0-341.333333 170.666667 170.666667 0 0 0 0 341.333333z m0 42.666667c-117.824 0-213.333333-95.509333-213.333334-213.333333s95.509333-213.333333 213.333334-213.333334 213.333333 95.509333 213.333333 213.333334-95.509333 213.333333-213.333333 213.333333z"
        fill={getIconColor(color, 1, '#3D3D3D')}
      />
      <path
        d="M768 759.232v-119.296c0-11.605333-9.557333-21.269333-21.333333-21.269333-11.861333 0-21.333333 9.514667-21.333334 21.269333v128.128a20.992 20.992 0 0 0 6.101334 14.933333l60.629333 60.629334a21.184 21.184 0 0 0 30.016-0.149334 21.333333 21.333333 0 0 0 0.149333-30.016L768 759.232z"
        fill={getIconColor(color, 2, '#3D3D3D')}
      />
    </svg>
  );
};

IconLishihangcheng.defaultProps = {
  size: 18,
};

export default IconLishihangcheng;
