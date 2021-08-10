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

const IconWenda: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M853.333333 768H651.946667l-109.504 117.482667a42.752 42.752 0 0 1-60.586667-0.042667L371.84 768H170.666667C135.36 768 106.666667 747.306667 106.666667 712.021333V170.581333A63.872 63.872 0 0 1 170.666667 106.666667h682.666666c35.328 0 64 28.629333 64 63.914666v541.44C917.333333 747.349333 888.746667 768 853.333333 768z m-225.28-28.501333l15.082667-14.165334H853.333333c11.861333 0 21.333333-1.557333 21.333334-13.312V170.581333A21.312 21.312 0 0 0 853.333333 149.333333H170.666667c-11.861333 0-21.333333 9.472-21.333334 21.248v541.44c0 11.690667 9.557333 13.312 21.333334 13.312h210.496l15.082666 14.165334s115.904 115.904 116.010667 115.797333l115.797333-115.797333zM490.666667 618.666667A21.269333 21.269333 0 0 1 512 597.333333c11.776 0 21.333333 9.450667 21.333333 21.312v21.376A21.269333 21.269333 0 0 1 512 661.333333c-11.776 0-21.333333-9.450667-21.333333-21.312v-21.376z m66.944-115.754667a145.92 145.92 0 0 0-12.501334 5.418667 20.693333 20.693333 0 0 0-12.16 19.029333c-0.106667 3.648 0.042667 7.424-0.768 10.944-2.325333 10.304-12.16 17.344-22.144 16.277333a21.248 21.248 0 0 1-19.562666-20.8c-1.152-30.037333 11.349333-51.925333 38.613333-65.002666a121.813333 121.813333 0 0 1 11.264-4.864c36.970667-13.333333 60.096-49.92 56-88.64-4.117333-38.912-34.773333-70.570667-73.216-75.605334a85.354667 85.354667 0 0 0-96.576 82.154667c-0.085333 2.773333-0.213333 5.653333-0.96 8.32a21.12 21.12 0 0 1-22.954667 15.168 21.248 21.248 0 0 1-18.645333-21.696c0.384-31.36 10.197333-59.541333 31.146667-82.88 34.410667-38.357333 77.653333-52.906667 127.530666-40.277333 50.346667 12.757333 81.557333 46.4 93.717334 97.109333 2.069333 8.661333 2.453333 17.728 3.605333 26.624-1.130667 53.248-32.981333 99.477333-82.389333 118.72z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconWenda.defaultProps = {
  size: 18,
};

export default IconWenda;