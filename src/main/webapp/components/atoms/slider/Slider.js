import React from "react";
import { Range } from "rc-slider";
import PropTypes from "prop-types";

import variables from "../../../styles/_variables.scss";
import "./slider.scss";

const Slider = (props) => {

  const { showCurrency } = props;
  const k = "k";
  const m = "M";
  const aud = showCurrency ? "$" : "";

  const isValueInitial = props.value[0]===props.min && props.value[1]===props.max;
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
    if (props.value[0]===props.min && props.value[1]===props.max) {
      return "Any";
    } else if (props.value[1]===props.max) {
      return `Above ${formatValue(props.value[0])}`;
    } else if (props.value[0]===props.min) {
      return `Below ${formatValue(props.value[1])}`;
    } else {
      return `${formatValue(props.value[0])} - ${formatValue(props.value[1])}`;
    }
  };

  return (
    <div className='sliderContainer' style={props.style}>
      <div>{getRange()}</div>
      <Range
        value={props.value}
        onChange={props.onChange}
        min={props.min}
        max={props.max}
        step={props.step}
        trackStyle={trackStyle}
        railStyle={railStyle}
      />
      <div className='sliderLegend'>
        <div className='sliderLabel'>{props.labelMin}</div>
        <div className='sliderLabel'>{props.labelMax}</div>
      </div>
    </div>
  );
};

Slider.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  labelMin: PropTypes.string,
  labelMax: PropTypes.string,
  showCurrency: PropTypes.bool,
  index: PropTypes.number,
  dragging: PropTypes.bool,
  style: PropTypes.object
};

export default Slider;