import React from "react";
import "./filter.scss";
import PropTypes from "prop-types";
import PropListTitle from "../../atoms/propListTitle/PropListTitle";
import Slider from "../../atoms/slider/Slider";

export const FilterLine = (props) => {
    return <div className='filterLine'>
                <PropListTitle title22={props.title22} icon={props.icon}/>
                <Slider
                    value={props.value}
                    onChange={props.onChange}
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    labelMin={props.labelMin}
                    labelMax={props.labelMax}
                    showCurrency={props.showCurrency}
                    />
            </div>;
};

FilterLine.propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    labelMin: PropTypes.string,
    labelMax: PropTypes.string,
    showCurrency: PropTypes.bool,
    icon: PropTypes.any,
    title22: PropTypes.string
};