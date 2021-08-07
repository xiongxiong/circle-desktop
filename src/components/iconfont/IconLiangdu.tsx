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

const IconLiangdu: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 810.666667c164.949333 0 298.666667-133.717333 298.666667-298.666667s-133.717333-298.666667-298.666667-298.666667-298.666667 133.717333-298.666667 298.666667 133.717333 298.666667 298.666667 298.666667z m0 42.666666c-188.522667 0-341.333333-152.810667-341.333333-341.333333S323.477333 170.666667 512 170.666667s341.333333 152.810667 341.333333 341.333333-152.810667 341.333333-341.333333 341.333333zM64 533.333333a21.333333 21.333333 0 0 1 0-42.666666h42.666667a21.333333 21.333333 0 0 1 0 42.666666H64zM490.666667 64a21.333333 21.333333 0 0 1 42.666666 0v42.666667a21.333333 21.333333 0 0 1-42.666666 0V64z m0 853.333333a21.333333 21.333333 0 0 1 42.666666 0v42.666667a21.333333 21.333333 0 0 1-42.666666 0v-42.666667z m426.666666-384a21.333333 21.333333 0 0 1 0-42.666666h42.666667a21.333333 21.333333 0 0 1 0 42.666666h-42.666667zM180.138667 210.304a21.333333 21.333333 0 0 1 30.165333-30.165333l30.165333 30.165333a21.333333 21.333333 0 1 1-30.165333 30.165333L180.138667 210.304z m633.557333-30.165333a21.333333 21.333333 0 0 1 30.165333 30.165333l-30.165333 30.165333a21.333333 21.333333 0 1 1-30.165333-30.165333l30.165333-30.165333zM210.304 783.530667a21.333333 21.333333 0 1 1 30.165333 30.165333l-30.165333 30.165333a21.333333 21.333333 0 1 1-30.165333-30.165333l30.165333-30.165333z m573.226667 30.165333a21.333333 21.333333 0 1 1 30.165333-30.165333l30.165333 30.165333a21.333333 21.333333 0 0 1-30.165333 30.165333l-30.165333-30.165333z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconLiangdu.defaultProps = {
  size: 18,
};

export default IconLiangdu;
