import React from "react";

import "./textInput.scss";

export interface TextInputProps {
    icon: React.ReactNode,
    rightIcon?: React.ReactNode,
    onRightIconClick?: () => void,
    type?: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    width?: string,
}

const TextInput = ({ icon, rightIcon, onRightIconClick, type = 'text', value, onChange, placeholder, width = "100%" }: TextInputProps) => {
    return (
        <div className='textInputContainer' style={{ width }}>
            {icon && <div className='textInputIcon'>{icon}</div>}
            <input 
                type={type} 
                value={value} 
                onChange={onChange} 
                placeholder={placeholder}
                className={`textInput ${icon ? "inputIcon" : ""}`}
                /> 
            {rightIcon && <div onClick={onRightIconClick} className='textInputRightIcon'>{rightIcon}</div>}  
        </div>
    );
};

export default TextInput;
