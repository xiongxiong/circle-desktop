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

const IconYuyin: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M490.666667 809.856c-136.149333-10.346667-244.842667-119.04-255.189334-255.189333h42.816C289.066667 674.282667 389.589333 768 512 768s222.933333-93.717333 233.706667-213.333333h42.816c-10.346667 136.149333-119.04 244.842667-255.189334 255.189333V896h170.666667v42.666667H320v-42.666667h170.666667v-86.144zM512 85.333333a192 192 0 0 1 192 192v256a192 192 0 0 1-384 0V277.333333a192 192 0 0 1 192-192z m0 42.666667a149.333333 149.333333 0 0 0-149.333333 149.333333v256a149.333333 149.333333 0 0 0 298.666666 0V277.333333a149.333333 149.333333 0 0 0-149.333333-149.333333z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconYuyin.defaultProps = {
  size: 18,
};

export default IconYuyin;
