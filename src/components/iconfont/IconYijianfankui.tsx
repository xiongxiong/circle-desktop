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

const IconYijianfankui: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M170.666667 896v0.021333c-0.426667 0.021333 0 0.426667 0 2.069334C170.666667 896.426667 170.24 896 170.666667 896z m682.666666-607.488V896H170.666667V170.666667h554.666666V128H170.474667C147.178667 128 128 146.176 128 168.576v729.514667C128 920.448 147.114667 938.666667 170.666667 938.666667h682.666666c23.68 0 42.666667-18.218667 42.666667-40.661334v-609.493333h-42.666667zM618.474667 519.701333a21.312 21.312 0 0 0 29.226666-7.530666l245.333334-416a21.354667 21.354667 0 0 0-36.757334-21.674667l-245.333333 416a21.333333 21.333333 0 0 0 7.530667 29.226667zM298.666667 384.021333h298.666666v-42.666666H298.666667v42.666666z m0 128h170.666666v-42.666666h-170.666666v42.666666z"
        fill={getIconColor(color, 0, '#4E4E4E')}
      />
    </svg>
  );
};

IconYijianfankui.defaultProps = {
  size: 18,
};

export default IconYijianfankui;
