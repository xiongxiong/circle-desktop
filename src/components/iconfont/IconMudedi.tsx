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

const IconMudedi: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M128 896h768v42.666667H128v-42.666667z m384-18.133333s-167.936-103.957333-179.413333-112c-33.557333-23.466667-59.690667-44.074667-77.013334-61.44A361.536 361.536 0 0 1 149.333333 448c0-200.298667 162.368-362.666667 362.666667-362.666667s362.666667 162.368 362.666667 362.666667c0 97.493333-38.656 188.885333-106.24 256.426667-17.322667 17.365333-43.456 37.973333-77.013334 61.44-11.477333 8.042667-179.413333 112-179.413333 112z m154.965333-146.965334c31.68-22.144 56.106667-41.429333 71.317334-56.618666A318.869333 318.869333 0 0 0 832 448c0-176.725333-143.274667-320-320-320-176.725333 0-320 143.274667-320 320 0 86.037333 34.090667 166.634667 93.717333 226.282667 15.210667 15.189333 39.637333 34.474667 71.317334 56.618666 11.157333 7.808 145.557333 92.330667 154.453333 97.493334 9.92-5.162667 144.32-89.685333 155.477333-97.493334zM512 618.666667a170.666667 170.666667 0 1 1 0-341.333334 170.666667 170.666667 0 0 1 0 341.333334z m0-42.666667a128 128 0 1 0 0-256 128 128 0 0 0 0 256z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconMudedi.defaultProps = {
  size: 18,
};

export default IconMudedi;
