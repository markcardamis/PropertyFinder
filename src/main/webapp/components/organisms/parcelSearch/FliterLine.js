import React from "react";
import "./parcelSearch.scss";
import PropTypes from "prop-types";

import Slider from "../../atoms/slider/Slider";
import PropListTitle from "../../atoms/propListTitle/PropListTitle";

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
                    style={{ width: "50%" }}
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
