import React from 'react';
import {Range} from 'rc-slider';

import './slider.scss';
import { SliderHandle } from "../sliderHandle/SliderHandle";

const Slider = (props) => {

  return (
    <div className='sliderContainer'>
      <Range
        value={props.value}
        onChange={props.onChange}
        min={props.min}
        max={props.max}
        step={props.step}
        handle={SliderHandle}
      />
      <div className='sliderLegend'>
        <div className='sliderLabel'>{props.labelMin}</div>
        <div className='sliderLabel'>{props.labelMax}</div>
      </div>
    </div>
  );
}
export default Slider;