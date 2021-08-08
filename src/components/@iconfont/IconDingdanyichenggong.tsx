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

const IconDingdanyichenggong: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M336.213333 519.466667l112.384 131.114666 239.722667-259.712a21.333333 21.333333 0 1 1 31.36 28.928l-256 277.333334a21.333333 21.333333 0 0 1-31.872-0.576l-128-149.333334a21.333333 21.333333 0 1 1 32.384-27.776zM298.666667 127.936C298.666667 104.405333 317.824 85.333333 341.12 85.333333h341.76C706.304 85.333333 725.333333 104.490667 725.333333 127.957333v42.752A42.645333 42.645333 0 0 1 682.88 213.333333H341.12C317.696 213.333333 298.666667 194.176 298.666667 170.709333V127.957333zM341.333333 170.666667h341.333334V128H341.333333v42.666667z m-105.173333-42.666667v42.666667S170.666667 170.688 170.666667 170.773333V896s682.666667 0.042667 682.666666-0.106667C853.333333 895.893333 853.333333 170.666667 853.205333 170.666667h-63.296V128h63.296C876.842667 128 896 147.072 896 170.773333v725.12C896 919.509333 877.013333 938.666667 853.333333 938.666667H170.666667a42.666667 42.666667 0 0 1-42.666667-42.773334V170.773333C128 147.157333 147.114667 128 170.752 128h65.408z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconDingdanyichenggong.defaultProps = {
  size: 18,
};

export default IconDingdanyichenggong;
