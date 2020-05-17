import React from 'react'
import './textInput.scss'

const TextInput = (props) => {
    return (
        <div className='textInputContainer' style={{width: props.width || '100%'}}>
            {props.icon&&props.icon}
            <input 
                type={'text'} 
                value={props.value} 
                onChange={props.onChange} 
                className='textInput'
                />   
        </div>
    )
}

export default TextInput
