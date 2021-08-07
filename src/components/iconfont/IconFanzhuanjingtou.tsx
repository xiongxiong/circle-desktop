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

const IconFanzhuanjingtou: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M791.616 256.341333h104.448a85.674667 85.674667 0 0 1 85.568 85.269334l1.706667 469.12a84.650667 84.650667 0 0 1-85.077334 85.056l-767.936-1.813334a85.973333 85.973333 0 0 1-85.674666-85.504l-1.685334-466.816a84.928 84.928 0 0 1 84.992-85.312h130.410667c11.861333 0 25.792-8.618667 31.125333-19.221333l34.858667-69.376c10.496-20.906667 38.144-38.08 61.674667-38.186667l276.928-1.344c23.637333-0.128 51.2 16.853333 61.824 37.952l35.904 71.253334c5.290667 10.496 19.114667 18.922667 30.933333 18.922666z m0 42.666667c-27.882667 0-56.469333-17.472-69.034667-42.410667l-35.904-71.253333c-3.349333-6.656-16.128-14.506667-23.509333-14.464l-276.906667 1.344c-7.466667 0.021333-20.48 8.106667-23.786666 14.677333l-34.858667 69.376c-12.586667 25.024-41.237333 42.730667-69.248 42.730667H127.957333c-23.466667 0-42.410667 18.986667-42.325333 42.474667l1.706667 466.837333a43.306667 43.306667 0 0 0 43.093333 42.986667l767.914667 1.813333a41.984 41.984 0 0 0 42.304-42.24l-1.685334-469.12a43.008 43.008 0 0 0-42.88-42.752h-104.469333z m-341.205333 52.416a192.085333 192.085333 0 0 0-53.205334 335.829333 21.333333 21.333333 0 0 1-25.536 34.197334A234.304 234.304 0 0 1 277.333333 533.333333c0-113.557333 80.682667-208.298667 187.84-229.973333l-32.256-32.277333a21.333333 21.333333 0 0 1 30.165334-30.165334L542.165333 320l-79.082666 79.082667a21.333333 21.333333 0 0 1-30.165334-30.165334l17.493334-17.493333z m70.634666 373.696a192 192 0 0 0 68.778667-367.36 21.333333 21.333333 0 1 1 17.301333-38.997333A234.666667 234.666667 0 0 1 746.666667 533.333333c0 126.698667-100.416 229.952-225.984 234.517334l27.733333 27.733333a21.333333 21.333333 0 0 1-30.165333 30.165333L439.168 746.666667l79.082667-79.082667a21.333333 21.333333 0 0 1 30.165333 30.165333l-27.370667 27.370667z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconFanzhuanjingtou.defaultProps = {
  size: 18,
};

export default IconFanzhuanjingtou;
