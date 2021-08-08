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

const IconXiyanqu: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M361.130667 464.469333a21.312 21.312 0 0 1-4.202667-5.376 117.333333 117.333333 0 1 0-133.184 169.877334 21.333333 21.333333 0 0 1-11.029333 41.194666 160 160 0 1 1 181.034666-232.661333c1.258667 1.173333 2.389333 2.517333 3.349334 4.032a177.450667 177.450667 0 0 0 115.690666 78.293333 178.048 178.048 0 1 0 67.946667-349.546666 21.333333 21.333333 0 0 1 8.149333-41.877334c119.658667 23.253333 197.802667 139.093333 174.549334 258.773334-23.253333 119.658667-139.136 197.802667-258.773334 174.549333a220.096 220.096 0 0 1-143.530666-97.28zM341.333333 746.666667h512a85.333333 85.333333 0 1 1 0 170.666666H341.333333a85.333333 85.333333 0 1 1 0-170.666666z m0 42.666666a42.666667 42.666667 0 1 0 0 85.333334h512a42.666667 42.666667 0 1 0 0-85.333334H341.333333z m-149.333333-42.666666a21.333333 21.333333 0 0 1 21.333333 21.333333v128a21.333333 21.333333 0 0 1-42.666666 0v-128a21.333333 21.333333 0 0 1 21.333333-21.333333z m-85.333333 0a21.333333 21.333333 0 0 1 21.333333 21.333333v128a21.333333 21.333333 0 0 1-42.666667 0v-128a21.333333 21.333333 0 0 1 21.333334-21.333333z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconXiyanqu.defaultProps = {
  size: 18,
};

export default IconXiyanqu;
