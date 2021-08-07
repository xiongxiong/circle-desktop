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

const IconKuaitui: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M981.333333 223.722667v570.197333c0 47.082667-33.28 66.496-74.346666 43.221333L401.984 550.976c-41.045333-23.253333-41.066667-61.013333 0-84.266667L906.986667 180.501333C948.010667 157.269333 981.333333 176.597333 981.333333 223.722667z m-558.293333 280.106666a41.173333 41.173333 0 0 0-7.232 4.992c1.706667 1.536 4.074667 3.242667 7.210667 5.034667L928.021333 800c12.608 7.146667 10.645333 8.32 10.645334-6.101333V223.722667c0-14.4 1.984-13.226667-10.666667-6.08L423.04 503.808z m195.989333-247.381333l-0.042666-9.045333c-0.106667-30.784-15.893333-39.914667-42.709334-24.725334L106.709333 488.768c-26.602667 15.061333-26.602667 31.957333 0 47.018667l469.546667 266.090666c26.794667 15.168 42.538667 5.973333 42.624-24.874666v-8.682667a21.333333 21.333333 0 1 1 42.666667 0.106667v8.682666c-0.149333 63.466667-51.093333 93.162667-106.304 61.866667L85.674667 572.928c-55.445333-31.402667-55.445333-89.856 0-121.258667l469.546666-266.090666c55.210667-31.274667 106.197333-1.728 106.453334 61.674666v9.045334a21.333333 21.333333 0 1 1-42.666667 0.170666z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconKuaitui.defaultProps = {
  size: 18,
};

export default IconKuaitui;
