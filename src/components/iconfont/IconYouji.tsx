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

const IconYouji: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M853.333333 128H213.12C189.738667 128 170.666667 147.157333 170.666667 170.666667v682.666666c0 23.594667 19.008 42.666667 42.453333 42.666667H853.333333V128zM213.12 85.333333H896v831.808c0 11.946667-9.557333 21.525333-21.333333 21.525334H213.12A85.205333 85.205333 0 0 1 128 853.333333V170.666667c0-47.018667 38.101333-85.333333 85.12-85.333334z m320.106667 853.333334H874.666667h-21.333334v-170.666667H213.12c-15.466667 0-29.952 4.138667-42.453333 11.349333v110.954667V853.333333c0-23.594667 19.008-42.666667 42.453333-42.666666H853.333333v128H533.226667zM512 128v281.813333l-74.368-44.586666a21.333333 21.333333 0 0 0-21.930667 0L341.333333 409.813333V128h170.666667z m10.368 337.792A21.333333 21.333333 0 0 0 554.666667 447.509333V128H298.666667v319.509333a21.333333 21.333333 0 0 0 32.298666 18.282667L426.666667 408.405333l95.701333 57.386667z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
    </svg>
  );
};

IconYouji.defaultProps = {
  size: 18,
};

export default IconYouji;
