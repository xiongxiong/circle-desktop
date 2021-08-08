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

const IconHuiyuan: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 256a85.333333 85.333333 0 1 0 0-170.666667 85.333333 85.333333 0 0 0 0 170.666667z m0-42.666667a42.666667 42.666667 0 1 1 0-85.333333 42.666667 42.666667 0 0 1 0 85.333333z m-202.218667 317.397334a21.333333 21.333333 0 0 0 26.069334-4.458667L512 330.56l176.149333 195.712a21.333333 21.333333 0 0 0 26.069334 4.458667l196.522666-107.2L835.136 896H188.949333l-14.122666-91.968H738.346667a21.333333 21.333333 0 1 0 0-42.666667H149.973333a21.333333 21.333333 0 0 0-21.077333 24.576l20.693333 134.634667A21.333333 21.333333 0 0 0 170.666667 938.666667h682.666666a21.333333 21.333333 0 0 0 21.056-17.962667l85.333334-533.333333a21.333333 21.333333 0 0 0-31.274667-22.101334l-219.861333 119.936-180.736-200.810666a21.333333 21.333333 0 0 0-31.701334 0l-180.736 200.810666L95.573333 365.269333a21.333333 21.333333 0 0 0-31.274666 22.208l46.165333 278.677334A21.333333 21.333333 0 0 0 152.533333 659.2L113.536 423.68l196.266667 107.050667z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconHuiyuan.defaultProps = {
  size: 18,
};

export default IconHuiyuan;
