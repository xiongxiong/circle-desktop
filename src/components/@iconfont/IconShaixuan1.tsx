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

const IconShaixuan1: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M675.328 117.717333a21.333333 21.333333 0 0 1-16.341333 39.402667A382.762667 382.762667 0 0 0 512 128C299.925333 128 128 299.925333 128 512s171.925333 384 384 384 384-171.925333 384-384c0-51.114667-9.984-100.8-29.12-146.986667a21.333333 21.333333 0 0 1 39.402667-16.341333A425.429333 425.429333 0 0 1 938.666667 512c0 235.648-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333c56.746667 0 112 11.093333 163.328 32.384zM682.666667 384H362.666667l106.666666 142.229333v220.309334a21.333333 21.333333 0 1 1-42.666666 0.064v-206.165334L328.533333 409.6c-24.682667-32.896-7.104-68.266667 34.026667-68.266667h320.213333c41.130667 0 58.794667 35.264 34.026667 68.266667L618.666667 540.437333V640a21.333333 21.333333 0 1 1-42.666667-0.064v-113.706667L682.666667 384z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconShaixuan1.defaultProps = {
  size: 18,
};

export default IconShaixuan1;
