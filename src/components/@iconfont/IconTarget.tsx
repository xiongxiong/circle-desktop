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

const IconTarget: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M439.722667 273.166222a240.028444 240.028444 0 0 0-100.010667 55.552 14.222222 14.222222 0 1 0 19.356444 20.864 211.527111 211.527111 0 0 1 88.106667-48.967111 14.222222 14.222222 0 1 0-7.452444-27.448889zM310.897778 385.038222a14.193778 14.193778 0 0 0-19.256889 5.76 238.222222 238.222222 0 0 0-14.734222 33.180445 14.208 14.208 0 1 0 26.794666 9.528889c3.555556-10.012444 7.921778-19.854222 12.970667-29.212445a14.222222 14.222222 0 0 0-5.774222-19.256889z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M945.777778 490.666667h-80.924445c-6.698667-173.752889-141.127111-315.264-311.879111-332.984889V78.222222a28.444444 28.444444 0 0 0-56.888889 0v78.236445c-178.062222 10.467556-320.554667 155.207111-327.452444 334.208H78.222222a28.444444 28.444444 0 0 0 0 56.888889h92.856889c20.565333 165.034667 156.928 294.584889 325.006222 304.455111V945.777778a28.444444 28.444444 0 0 0 56.888889 0v-94.990222C713.856 834.090667 842.467556 707.456 862.407111 547.555556H945.777778a28.444444 28.444444 0 0 0 0-56.888889zM552.974222 793.272889V746.666667a28.444444 28.444444 0 0 0-56.888889 0v48.071111c-136.618667-9.656889-247.281778-113.649778-267.320889-247.182222H277.333333a28.444444 28.444444 0 0 0 0-56.888889h-51.470222c6.826667-147.555556 123.576889-266.609778 270.222222-276.949334V277.333333a28.444444 28.444444 0 0 0 56.888889 0v-62.165333c139.278222 17.379556 248.049778 133.205333 254.648889 275.498667H746.666667a28.444444 28.444444 0 0 0 0 56.888889h58.055111c-19.256889 128.412444-122.339556 229.575111-251.747556 245.717333z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

IconTarget.defaultProps = {
  size: 18,
};

export default IconTarget;