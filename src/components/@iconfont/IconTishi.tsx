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

const IconTishi: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M661.333333 661.397333c-11.157333 2.645333-11.157333 2.645333-12.010666 3.754667l-0.768 0.597333 0.576-0.533333a21.226667 21.226667 0 0 1 12.202666-3.84zM384 725.333333h256v-42.602666c0-7.253333 3.626667-13.653333 9.130667-17.493334 2.816-2.688 5.418667-5.269333 8.768-8.661333 5.546667-5.632 11.946667-12.202667 23.765333-24.448 18.965333-19.626667 23.893333-24.746667 29.568-30.4a282.944 282.944 0 0 0 83.157333-200.768c0-37.290667-7.274667-74.24-21.546666-108.693333a21.333333 21.333333 0 1 1 39.445333-16.32 327.04 327.04 0 0 1 24.768 125.013333c0 86.037333-33.578667 168.874667-95.658667 230.954667-5.397333 5.397333-10.346667 10.496-28.906666 29.717333A3223.168 3223.168 0 0 1 682.666667 692.138667l-0.021334 79.466666c3.2 65.493333-16.448 103.061333-85.034666 103.061334h-174.293334c-66.688 0-89.664-42.88-81.984-103.36v-82.133334c-14.208-10.432-33.834667-29.290667-61.824-57.258666-127.552-127.573333-127.552-334.357333 0-461.909334a325.589333 325.589333 0 0 1 230.954667-95.658666c42.858667 0 85.354667 8.384 125.013333 24.789333a21.333333 21.333333 0 0 1-16.32 39.424 284.373333 284.373333 0 0 0-108.693333-21.546667c-74.837333 0-146.794667 29.184-200.789333 83.178667-110.890667 110.869333-110.890667 290.666667 0 401.536 13.184 13.184 28.608 27.989333 40.938666 39.210667 6.656 6.08 12.224 10.944 16.298667 14.229333 1.92 1.536 3.370667 2.645333 4.245333 3.2-2.069333-1.344-3.285333-1.941333-8.490666-1.941333a21.333333 21.333333 0 0 1 21.333333 21.333333V725.333333z m0 42.666667v4.693333l-0.192 2.837334c-5.248 38.997333 3.904 56.469333 39.509333 56.469333h174.293334c37.333333 0 44.586667-13.866667 42.389333-59.349333V768H384z m0 128h256v42.666667H384v-42.666667z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconTishi.defaultProps = {
  size: 18,
};

export default IconTishi;