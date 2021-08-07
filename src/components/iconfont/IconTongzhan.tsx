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

const IconTongzhan: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M128 416v-42.666667h768v42.666667H128z m106.666667-117.333333a21.333333 21.333333 0 0 1 0-42.666667h128a21.333333 21.333333 0 0 1 0 42.666667h-128zM149.333333 128a21.333333 21.333333 0 0 0-21.333333 21.333333v469.333334a21.333333 21.333333 0 0 0 21.333333 21.333333h725.333334a21.333333 21.333333 0 0 0 21.333333-21.333333V149.333333a21.333333 21.333333 0 0 0-21.333333-21.333333H149.333333z m384 554.666667v234.666666a21.333333 21.333333 0 0 1-42.666666 0V682.666667H149.333333a64 64 0 0 1-64-64V149.333333a64 64 0 0 1 64-64h725.333334a64 64 0 0 1 64 64v469.333334a64 64 0 0 1-64 64H533.333333z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconTongzhan.defaultProps = {
  size: 18,
};

export default IconTongzhan;
