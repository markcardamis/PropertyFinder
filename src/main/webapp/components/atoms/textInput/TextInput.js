import React from "react";
import PropTypes from "prop-types";
import "./textInput.scss";

const TextInput = (props) => {
    const { icon, rightIcon, onRightIconClick, width, type, value, onChange, placeholder } = props;
    return (
        <div className='textInputContainer' style={{ width: width || "100%" }}>
            {icon && <div className='textInputIcon'>{icon}</div>}
            <input 
                type={type || "text"} 
                value={value} 
                onChange={onChange} 
                placeholder={placeholder}
                className={`textInput ${icon ? "inputIcon" : ""}`}
                /> 
            {rightIcon && <div onClick={onRightIconClick} className='textInputRightIcon'>{rightIcon}</div>}  
        </div>
    );
};

TextInput.propTypes = {
    icon: PropTypes.any,
    rightIcon: PropTypes.any,
    onRightIconClick: PropTypes.any,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    width: PropTypes.string
  };

export default TextInput;
