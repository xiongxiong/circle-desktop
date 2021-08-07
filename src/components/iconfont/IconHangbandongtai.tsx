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

const IconHangbandongtai: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M912.746667 671.189333A429.269333 429.269333 0 0 1 514.453333 938.666667C277.482667 938.666667 85.333333 747.648 85.333333 512S277.461333 85.333333 514.474667 85.333333c83.072 0 160.64 23.466667 226.346666 64.128l-0.085333 0.128c5.76 4.416 9.493333 11.349333 9.493333 19.157334 0 13.333333-10.88 24.149333-24.32 24.149333-7.04 0-13.354667-2.986667-17.792-7.722667a381.354667 381.354667 0 0 0-193.642666-52.437333c-210.688 0-381.44 169.813333-381.44 379.264 0 209.450667 170.752 379.264 381.44 379.264 161.365333 0 299.349333-99.626667 355.072-240.426667 2.773333-10.325333 12.224-17.941333 23.488-17.941333 13.44 0 24.298667 10.816 24.298666 24.149333 0 5.290667-1.706667 10.176-4.586666 14.144z m-438.762667-159.082666c-18.837333-14.506667-37.290667-28.672-55.744-42.837334-32.064-24.618667-64.149333-49.216-96.170667-73.877333-14.037333-10.816-13.312-27.221333 1.557334-36.736 22.506667-14.378667 45.12-28.629333 67.562666-43.114667 7.829333-5.056 15.509333-5.44 23.893334-1.493333 69.76 32.661333 139.605333 65.194667 209.365333 97.898667 3.2 1.493333 5.418667 1.216 8.277333-0.618667 40.490667-25.898667 80.917333-51.882667 121.578667-77.504 42.624-26.858667 98.026667-11.605333 120.512 32.853333 19.648 38.890667 6.656 85.653333-30.570667 109.418667-67.306667 42.944-134.698667 85.824-202.026666 128.725333-67.733333 43.136-135.466667 86.229333-203.136 129.472-9.429333 6.016-18.218667 6.08-27.541334-0.170666-54.250667-36.352-108.586667-72.533333-162.901333-108.821334-13.930667-9.322667-14.4-25.92-1.024-36.074666 20.608-15.616 41.301333-31.104 61.888-46.762667 7.253333-5.504 14.826667-6.549333 23.338667-3.285333 19.541333 7.488 39.125333 14.826667 58.773333 22.058666 1.706667 0.64 4.416 0.64 5.888-0.277333 24.938667-15.701333 49.770667-31.594667 74.602667-47.445333 0.469333-0.298667 0.896-0.661333 1.877333-1.408z m-178.496 93.717333c1.92 1.322667 3.2 2.261333 4.522667 3.136 40.64 27.136 81.322667 54.250667 121.877333 81.493333 2.858667 1.92 4.693333 1.92 7.594667 0.042667 130.368-83.157333 260.8-166.208 391.189333-249.344 3.285333-2.090667 6.485333-4.48 9.194667-7.253333a41.984 41.984 0 0 0 2.474666-55.722667c-13.568-16.768-37.056-20.544-55.765333-8.661333-43.776 27.754667-87.552 55.530667-131.093333 83.626666-9.429333 6.08-18.005333 6.741333-28.181334 1.962667-69.034667-32.512-138.24-64.682667-207.36-97.066667-2.986667-1.386667-5.141333-1.429333-7.936 0.426667-9.322667 6.186667-18.816 12.096-28.245333 18.112-1.152 0.746667-2.282667 1.557333-3.733333 2.56l4.906666 3.84 146.730667 112.64c14.357333 11.029333 13.696 27.52-1.621333 37.290667-36.48 23.253333-73.024 46.442667-109.44 69.76-7.36 4.736-14.677333 5.418667-22.784 2.282666-18.986667-7.338667-38.037333-14.421333-57.109334-21.482666-1.557333-0.576-4.032-0.96-5.12-0.149334-10.005333 7.210667-19.776 14.72-30.101333 22.506667z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconHangbandongtai.defaultProps = {
  size: 18,
};

export default IconHangbandongtai;
