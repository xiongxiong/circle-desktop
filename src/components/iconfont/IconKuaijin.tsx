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

const IconKuaijin: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M600.96 503.808L96 217.642667c-12.650667-7.168-10.666667-8.32-10.666667 6.08v570.197333c0 14.4-1.962667 13.248 10.666667 6.101333l504.96-286.165333c3.157333-1.792 5.546667-3.498667 7.232-5.034667a41.173333 41.173333 0 0 0-7.210667-5.013333zM42.666667 223.722667c0-47.146667 33.322667-66.453333 74.346666-43.2l505.002667 286.165333c41.066667 23.274667 41.045333 61.013333 0 84.266667L117.013333 837.162667C75.946667 860.416 42.666667 841.002667 42.666667 793.92V223.722667z m362.304 32.725333a21.333333 21.333333 0 1 1-42.666667-0.170667l0.042667-9.045333c0.234667-63.402667 51.221333-92.949333 106.410666-61.653333L938.325333 451.626667c55.445333 31.402667 55.445333 89.856 0 121.258666l-469.546666 266.090667c-55.232 31.274667-106.176 1.578667-106.325334-61.888v-8.682667a21.333333 21.333333 0 1 1 42.666667-0.106666v8.682666c0.085333 30.869333 15.829333 40.042667 42.602667 24.874667l469.568-266.090667c26.602667-15.061333 26.602667-31.957333 0-47.018666l-469.546667-266.090667c-26.837333-15.189333-42.624-6.058667-42.730667 24.725333l-0.042666 9.045334z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconKuaijin.defaultProps = {
  size: 18,
};

export default IconKuaijin;
