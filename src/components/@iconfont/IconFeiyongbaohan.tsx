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

const IconFeiyongbaohan: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667zM558.378667 426.666667h81.493333c11.84 0 21.461333 9.472 21.461333 21.333333 0 11.776-9.6 21.333333-21.482666 21.333333H533.333333v85.333334h106.517334c11.861333 0 21.482667 9.472 21.482666 21.333333 0 11.776-9.6 21.333333-21.482666 21.333333H533.333333v127.850667c0 11.861333-9.472 21.482667-21.333333 21.482667-11.776 0-21.333333-9.578667-21.333333-21.482667V597.333333h-106.517334A21.354667 21.354667 0 0 1 362.666667 576c0-11.776 9.6-21.333333 21.482666-21.333333H490.666667v-85.333334h-106.517334A21.354667 21.354667 0 0 1 362.666667 448c0-11.776 9.6-21.333333 21.482666-21.333333h81.472l-97.813333-114.133334a21.333333 21.333333 0 0 1 32.384-27.733333L512 415.189333l111.786667-130.432a21.333333 21.333333 0 1 1 32.426666 27.776L558.357333 426.666667z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconFeiyongbaohan.defaultProps = {
  size: 18,
};

export default IconFeiyongbaohan;