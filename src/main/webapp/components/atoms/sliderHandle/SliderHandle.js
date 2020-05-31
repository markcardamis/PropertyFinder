import React from "react";
import { Handle } from "rc-slider";

import './sliderHandle.scss';

export const SliderHandle = (props) => {
  const { value, dragging, index, ...rest } = props;

  return (
    <Handle className='flexHandle' key={index} value={value} {...rest}>
      {dragging && <div className='handleValueContainer'>
            <div className='handleValue'>{value}</div>
          </div>}
    </Handle>
  );
}
