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

const IconBangzhu: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667z m-117.717333 449.173334a145.92 145.92 0 0 0-12.501334 5.418666 20.693333 20.693333 0 0 0-12.16 19.029334c-0.106667 3.648 0.042667 7.424-0.768 10.944-2.325333 10.304-12.16 17.344-22.144 16.277333a21.248 21.248 0 0 1-19.562666-20.8c-1.152-30.037333 11.349333-51.925333 38.613333-65.002667a121.813333 121.813333 0 0 1 11.264-4.864c36.970667-13.333333 60.096-49.92 56-88.64-4.117333-38.912-34.773333-70.570667-73.216-75.605333a85.354667 85.354667 0 0 0-96.576 82.154667c-0.085333 2.773333-0.213333 5.653333-0.96 8.32a21.12 21.12 0 0 1-22.954667 15.168 21.248 21.248 0 0 1-18.645333-21.696c0.384-31.36 10.197333-59.541333 31.146667-82.88 34.410667-38.357333 77.653333-52.906667 127.530666-40.277334 50.346667 12.757333 81.557333 46.4 93.717334 97.109334 2.069333 8.661333 2.453333 17.728 3.605333 26.624-1.130667 53.248-32.981333 99.477333-82.389333 118.72zM490.666667 682.666667A21.269333 21.269333 0 0 1 512 661.333333c11.776 0 21.333333 9.450667 21.333333 21.312v21.376A21.269333 21.269333 0 0 1 512 725.333333c-11.776 0-21.333333-9.450667-21.333333-21.312v-21.376z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconBangzhu.defaultProps = {
  size: 18,
};

export default IconBangzhu;
