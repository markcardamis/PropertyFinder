import React from "react";
import PropTypes from "prop-types";
import "./buttonFilled.scss";

const ButtonFilled = props => {
    return (
            <div className='buttonFilled' onClick={props.onClick} style={{ width: props.width || "100%" }}>
                <div className='buttonFilledTitle'>{props.title}</div>
            </div>
    );
};

ButtonFilled.propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func
};

export default ButtonFilled;
