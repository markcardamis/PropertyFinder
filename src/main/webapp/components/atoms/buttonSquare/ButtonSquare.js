import React from "react";
import PropTypes from "prop-types";
import "./buttonSquare.scss";

const ButtonSquare = props => {
    return (
        <div className="buttonSquare" onClick={props.onClick} style={props.style}>
            {props.icon}
        </div>
    );
};

ButtonSquare.propTypes = {
    onClick: PropTypes.func,
    style: PropTypes.object,
    icon: PropTypes.any
};

export default ButtonSquare;
