import React from "react";
import PropTypes from "prop-types";
import "./buttonFilled.scss";

const ButtonFilled = props => {
    return (
            <div className='buttonFilled' onClick={props.onClick} style={props.style}>
                <div className='buttonFilledTitle'>{props.title}</div>
            </div>
    );
};

ButtonFilled.propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
};

export default ButtonFilled;
