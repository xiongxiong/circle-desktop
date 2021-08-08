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

const IconHuafu2: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M320 213.333333l384 0 0 597.333334-384 0 0-597.333334Z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
      <path
        d="M830.165333 896H193.834667C157.482667 896 128 864.746667 128 826.176V197.824C128 159.253333 157.482667 128 193.834667 128h636.330666C866.517333 128 896 159.253333 896 197.824v628.352C896 864.746667 866.517333 896 830.165333 896z m21.952-674.901333c0-25.706667-19.669333-46.549333-43.882666-46.549334H215.765333c-24.213333 0-43.882667 20.842667-43.882666 46.549334v581.802666c0 25.706667 19.669333 46.549333 43.882666 46.549334h592.469334c24.213333 0 43.882667-20.842667 43.882666-46.549334V221.098667z"
        fill={getIconColor(color, 1, '#3D3D3D')}
      />
    </svg>
  );
};

IconHuafu2.defaultProps = {
  size: 18,
};

export default IconHuafu2;
