import React from 'react'
import './textInput.scss'

const TextInput = (props) => {
    return (
        <div className='textInputContainer' style={{width: props.width || '100%'}}>
            {props.icon&&<div className='textInputIcon'>{props.icon}</div>}
            <input 
                type={props.type || 'text'} 
                value={props.value} 
                onChange={props.onChange} 
                placeholder={props.placeholder}
                className='textInput'
                style={{
                    textAlign: props.icon ? 'start' : 'center', 
                    fontSize: props.icon ? 16 : 20,
                    paddingLeft: props.icon ? 40 : 0
                }}
                />   
        </div>
    )
}

export default TextInput
