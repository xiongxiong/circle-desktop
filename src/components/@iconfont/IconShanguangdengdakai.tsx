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

const IconShanguangdengdakai: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M613.610667 56.661333c14.570667-18.453333 21.696-15.082667 15.829333 8l-74.048 290.88 243.413333 73.173334c11.178667 3.349333 14.549333 13.653333 7.488 23.04L418.773333 967.893333c-14.186667 18.901333-20.906667 15.786667-14.933333-7.146666l78.378667-301.568-281.194667-49.429334c-11.605333-2.048-15.189333-11.072-7.744-20.522666L613.610667 56.661333z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconShanguangdengdakai.defaultProps = {
  size: 18,
};

export default IconShanguangdengdakai;
