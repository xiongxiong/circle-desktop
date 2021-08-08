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

const IconShanguangdengguanbi: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M668.842667 634.816L452.586667 260.650667l161.024-203.989334c14.570667-18.453333 21.696-15.082667 15.829333 8l-74.048 290.88 243.413333 73.173334c11.178667 3.349333 14.549333 13.653333 7.488 23.04l-137.450666 183.061333z m-83.541334 111.253333L418.773333 967.893333c-14.186667 18.901333-20.906667 15.786667-14.933333-7.146666l78.378667-301.568-281.194667-49.429334c-11.605333-2.048-15.189333-11.072-7.744-20.522666l173.994667-220.416 218.048 377.28zM258.837333 95.957333a21.333333 21.333333 0 1 1 36.992-21.248l490.453334 853.205334a21.333333 21.333333 0 0 1-36.992 21.248L258.837333 95.957333z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconShanguangdengguanbi.defaultProps = {
  size: 18,
};

export default IconShanguangdengguanbi;
