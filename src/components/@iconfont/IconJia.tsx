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

const IconJia: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667zM490.666667 490.666667h-149.482667A21.269333 21.269333 0 0 0 320 512c0 11.861333 9.493333 21.333333 21.184 21.333333H490.666667v149.482667c0 11.690667 9.557333 21.184 21.333333 21.184 11.861333 0 21.333333-9.493333 21.333333-21.184V533.333333h149.482667A21.269333 21.269333 0 0 0 704 512c0-11.861333-9.493333-21.333333-21.184-21.333333H533.333333v-149.482667A21.269333 21.269333 0 0 0 512 320c-11.861333 0-21.333333 9.493333-21.333333 21.184V490.666667z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconJia.defaultProps = {
  size: 18,
};

export default IconJia;
