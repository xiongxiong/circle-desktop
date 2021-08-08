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

const IconZhoubianyou: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M636.288 438.549333a21.333333 21.333333 0 0 0-35.242667 0L317.738667 853.333333h601.856l-283.306667-414.784z m35.221333-24.064l306.112 448.149334A21.333333 21.333333 0 0 1 960 896H277.333333a21.333333 21.333333 0 0 1-17.621333-33.365333l306.112-448.149334a64 64 0 0 1 105.685333 0zM105.258667 704l304-429.184a21.333333 21.333333 0 0 1 34.816 0l55.850666 78.848a21.333333 21.333333 0 0 0 34.816-24.661333l-55.850666-78.848a64 64 0 0 0-104.448 0L46.592 713.002667A21.333333 21.333333 0 0 0 64 746.666667h181.333333a21.333333 21.333333 0 0 0 0-42.666667H105.258667zM832 384a128 128 0 1 1 0-256 128 128 0 0 1 0 256z m0-42.666667a85.333333 85.333333 0 1 0 0-170.666666 85.333333 85.333333 0 0 0 0 170.666666z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconZhoubianyou.defaultProps = {
  size: 18,
};

export default IconZhoubianyou;
