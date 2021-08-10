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

const IconGouwu: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M704 318.805333v-58.197333C704 152.149333 618.389333 64 512.469333 64s-191.530667 88.149333-191.530666 196.608v58.197333h42.666666v-58.197333c0-85.162667 66.773333-153.941333 148.864-153.941333C594.538667 106.666667 661.333333 175.445333 661.333333 260.608v58.197333h42.666667z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
      <path
        d="M146.24 363.989333A25.045333 25.045333 0 0 1 170.666667 341.333333h682.666666c12.309333 0 23.552 10.474667 24.426667 22.656L914.346667 876.373333c0.810667 11.136-7.104 19.626667-18.282667 19.626667H127.936a17.856 17.856 0 0 1-18.282667-19.626667l36.586667-512.384zM103.68 360.96L67.093333 873.344A60.522667 60.522667 0 0 0 127.936 938.666667h768.128a60.373333 60.373333 0 0 0 60.842667-65.322667L920.32 360.96C917.845333 326.464 888.042667 298.666667 853.333333 298.666667H170.666667c-34.837333 0-64.512 27.626667-66.986667 62.293333z"
        fill={getIconColor(color, 1, '#3D3D3D')}
      />
      <path
        d="M661.333333 469.333333m-42.666666 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z"
        fill={getIconColor(color, 2, '#3D3D3D')}
      />
      <path
        d="M362.666667 469.333333m-42.666667 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z"
        fill={getIconColor(color, 3, '#3D3D3D')}
      />
    </svg>
  );
};

IconGouwu.defaultProps = {
  size: 18,
};

export default IconGouwu;