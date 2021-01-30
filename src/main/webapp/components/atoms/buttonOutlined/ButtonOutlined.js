import React from "react";
import PropTypes from "prop-types";
import "./buttonOutlined.scss";

const ButtonOutlined = props => {
    return (
            <div className='buttonOutlined' onClick={props.onClick} style={props.style}>
                <div className='buttonOutlinedTitle' style={props.titleStyle}>{props.title}</div>
            </div>
    );
};

ButtonOutlined.propTypes = {
    title: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
    titleStyle: PropTypes.object,
};

export default ButtonOutlined;
