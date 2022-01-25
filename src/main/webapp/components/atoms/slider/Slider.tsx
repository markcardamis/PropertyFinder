import React from "react";
import { Range } from "rc-slider";

import variables from "../../../styles/_variables.module.scss";
import "./slider.scss";

export interface SliderProps {
  value: [number, number],
  onChange: () => void,
  min: number,
  max: number,
  step: number,
  labelMin: string,
  labelMax: string,
  showCurrency: boolean,
  style?: React.CSSProperties,
}

const Slider = ({ value, onChange, min, max, step, labelMin, labelMax, showCurrency, style }: SliderProps) => {
  const k = "k";
  const m = "M";
  const aud = showCurrency ? "$" : "";

  const isValueInitial = value[0] === min && value[1] === max;
  const trackColor = isValueInitial ? variables.lightGrey : variables.green;
  const trackStyle = [ { backgroundColor: trackColor }, { backgroundColor: trackColor } ];
  const railStyle = { backgroundColor: variables.lightGrey };

  const formatValue = (value) => {
    if (value>999999) {
      return `${aud}${value/1000000}${m}`;
    } else if (value>999) {
      return `${aud}${value/1000}${k}`;
    } else {
      return `${aud}${value}`;
    }
  };

  const getRange = () => {
    if (value[0] === min && value[1] === max) {
      return "Any";
    } else if (value[1] === max) {
      return `Above ${formatValue(value[0])}`;
    } else if (value[0] === min) {
      return `Below ${formatValue(value[1])}`;
    } else {
      return `${formatValue(value[0])} - ${formatValue(value[1])}`;
    }
  };

  return (
    <div className='sliderContainer' style={style}>
      <div>{getRange()}</div>
      <Range
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        trackStyle={trackStyle}
        railStyle={railStyle}
      />
      <div className='sliderLegend'>
        <div className='sliderLabel'>{labelMin}</div>
        <div className='sliderLabel'>{labelMax}</div>
      </div>
    </div>
  );
};

export default Slider;