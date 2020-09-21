import React from "react";
import { Range, Handle } from "rc-slider";
import PropTypes from "prop-types";
import "./slider.scss";

const Slider = (props) => {

  const { showCurrency } = props;

  const SliderHandle = (props) => {
    const { value, dragging, index, ...rest } = props;
    const k = "k";
    const m = "M";
    const aud = showCurrency ? "$" : "";
    return (
      <Handle className='flexHandle' key={index} value={value} {...rest}>
        {dragging && <div className='handleValueContainer'>
              <div className='handleValue'>{`${value>999999 ? aud+value/1000000+m : value>999 ? aud+value/1000+k : aud+value}`}</div>
            </div>}
      </Handle>
    );
  };

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
  dragging: PropTypes.bool
};

export default Slider;