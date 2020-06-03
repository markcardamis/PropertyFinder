import React from "react";
import { Handle } from "rc-slider";

import './sliderHandle.scss';

export const SliderHandle = (props) => {
  const { value, dragging, index, ...rest } = props;
  const k = 'k'
  const m = 'M'
  const aud = '$'
  return (
    <Handle className='flexHandle' key={index} value={value} {...rest}>
      {dragging && <div className='handleValueContainer'>
            <div className='handleValue'>{`${value>999999 ? aud+value/1000000+m : value>999 ? aud+value/1000+k : value}`}</div>
          </div>}
    </Handle>
  );
}
