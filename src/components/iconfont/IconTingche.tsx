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

const IconTingche: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667zM426.666667 618.666667v106.730666c0 11.733333-9.472 21.269333-21.333334 21.269334-11.776 0-21.333333-9.664-21.333333-21.269334V341.482667c0-11.861333 9.6-21.482667 21.482667-21.482667H533.333333c82.474667 0 149.333333 67.029333 149.333334 149.333333 0 82.474667-67.029333 149.333333-149.333334 149.333334h-106.666666z m0-42.666667h106.666666c58.816 0 106.666667-47.829333 106.666667-106.666667 0-58.816-47.829333-106.666667-106.666667-106.666666h-106.666666v213.333333z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconTingche.defaultProps = {
  size: 18,
};

export default IconTingche;
