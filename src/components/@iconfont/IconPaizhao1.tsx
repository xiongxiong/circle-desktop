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

const IconPaizhao1: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M791.616 256.341333h104.448a85.674667 85.674667 0 0 1 85.568 85.269334l1.706667 469.12a84.650667 84.650667 0 0 1-85.077334 85.056l-767.936-1.813334a85.973333 85.973333 0 0 1-85.674666-85.504l-1.685334-466.816a84.928 84.928 0 0 1 84.992-85.312h130.410667c11.861333 0 25.792-8.618667 31.125333-19.221333l34.858667-69.376c10.496-20.906667 38.144-38.08 61.674667-38.186667l276.928-1.344c23.637333-0.128 51.2 16.853333 61.824 37.952l35.904 71.253334c5.290667 10.496 19.114667 18.922667 30.933333 18.922666zM512 298.666667c-141.418667 0-256 114.581333-256 256s114.581333 256 256 256c141.397333 0 256-114.581333 256-256s-114.602667-256-256-256z m-5.333333 416A154.666667 154.666667 0 0 0 661.333333 560a21.333333 21.333333 0 0 0-42.666666 0c0 61.866667-50.133333 112-112 112a21.333333 21.333333 0 1 0 0 42.666667z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconPaizhao1.defaultProps = {
  size: 18,
};

export default IconPaizhao1;
