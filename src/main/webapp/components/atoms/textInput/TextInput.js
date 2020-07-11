import React from 'react';
import './textInput.scss';

const TextInput = (props) => {
    return (
        <div className='textInputContainer' style={{width: props.width || '100%'}}>
            {props.icon&&<div className='textInputIcon'>{props.icon}</div>}
            <input 
                type={props.type || 'text'} 
                value={props.value} 
                onChange={props.onChange} 
                placeholder={props.placeholder}
                className={`textInput ${props.icon ? 'inputIcon' : ''}`}
                />   
        </div>
    )
}

export default TextInput;
