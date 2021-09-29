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

const IconFolderForbidLine: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M938.666667 480.213333a297.472 297.472 0 0 0-85.333334-41.173333V298.666667h-358.997333l-85.333333-85.333334H170.666667v597.333334h311.04a296.96 296.96 0 0 0 41.173333 85.333333H128a42.666667 42.666667 0 0 1-42.666667-42.666667V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667h316.330667l85.333333 85.333333H896a42.666667 42.666667 0 0 1 42.666667 42.666667v224.213333zM768 938.666667a213.333333 213.333333 0 1 1 0-426.666667 213.333333 213.333333 0 0 1 0 426.666667z m-55.168-97.792a128 128 0 0 0 170.709333-170.709334l-170.709333 170.666667z m-60.373333-60.373334l170.709333-170.666666a128 128 0 0 0-170.709333 170.709333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconFolderForbidLine.defaultProps = {
  size: 18,
};

export default IconFolderForbidLine;
