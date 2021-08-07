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

const IconDingdan: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M298.666667 341.333333h384v42.666667H298.666667v-42.666667z m0 128h298.666666v42.666667H298.666667v-42.666667z m0 128h298.666666v42.666667H298.666667v-42.666667z m0-469.376C298.666667 104.405333 317.824 85.333333 341.12 85.333333h341.76C706.304 85.333333 725.333333 104.490667 725.333333 127.957333v42.752A42.645333 42.645333 0 0 1 682.88 213.333333H341.12C317.696 213.333333 298.666667 194.176 298.666667 170.709333V127.957333zM170.666667 938.666667h682.666666c23.68 0 42.666667-19.157333 42.666667-42.773334V170.773333C896 147.093333 876.842667 128 853.205333 128h-63.296v42.666667h63.296c0.128 0.106667 0.170667 725.333333 0.128 725.333333H170.666667V170.773333C170.752 170.709333 236.16 170.666667 236.16 170.666667V128H170.752A42.752 42.752 0 0 0 128 170.773333v725.12A42.666667 42.666667 0 0 0 170.666667 938.666667z m170.666666-768h341.333334V128H341.333333v42.666667z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconDingdan.defaultProps = {
  size: 18,
};

export default IconDingdan;
