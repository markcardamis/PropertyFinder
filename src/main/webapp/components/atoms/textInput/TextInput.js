import React from "react";
import PropTypes from "prop-types";
import "./textInput.scss";

const TextInput = (props) => {
    return (
        <div className='textInputContainer' style={{ width: props.width || "100%" }}>
            {props.icon&&<div className='textInputIcon'>{props.icon}</div>}
            <input 
                type={props.type || "text"} 
                value={props.value} 
                onChange={props.onChange} 
                placeholder={props.placeholder}
                className={`textInput ${props.icon ? "inputIcon" : ""}`}
                />   
        </div>
    );
};

TextInput.propTypes = {
    icon: PropTypes.any,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    width: PropTypes.string
  };

export default TextInput;
