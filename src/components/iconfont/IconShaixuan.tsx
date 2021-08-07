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

const IconShaixuan: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M675.328 117.717333a21.333333 21.333333 0 0 1-16.341333 39.402667A382.762667 382.762667 0 0 0 512 128C299.925333 128 128 299.925333 128 512s171.925333 384 384 384 384-171.925333 384-384c0-51.114667-9.984-100.8-29.12-146.986667a21.333333 21.333333 0 0 1 39.402667-16.341333A425.429333 425.429333 0 0 1 938.666667 512c0 235.648-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333c56.746667 0 112 11.093333 163.328 32.384zM320 512c0-11.776 9.493333-21.333333 21.184-21.333333h341.632c11.690667 0 21.184 9.472 21.184 21.333333 0 11.776-9.493333 21.333333-21.184 21.333333H341.184A21.205333 21.205333 0 0 1 320 512z m0-149.333333c0-11.776 9.493333-21.333333 21.184-21.333334h341.632c11.690667 0 21.184 9.472 21.184 21.333334 0 11.776-9.493333 21.333333-21.184 21.333333H341.184A21.205333 21.205333 0 0 1 320 362.666667z m0 298.666666c0-11.776 9.493333-21.333333 21.184-21.333333h341.632c11.690667 0 21.184 9.472 21.184 21.333333 0 11.776-9.493333 21.333333-21.184 21.333334H341.184A21.205333 21.205333 0 0 1 320 661.333333z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconShaixuan.defaultProps = {
  size: 18,
};

export default IconShaixuan;
