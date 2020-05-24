import React from 'react';
import PropTypes from 'prop-types';
import './buttonOutlined.scss';

const ButtonOutlined = props => {
    return (
            <div className='buttonOutlined' onClick={props.onClick} style={{width: props.width || '100%'}}>
                <div className='buttonOutlinedTitle'>{props.title}</div>
            </div>
    )
}

ButtonOutlined.propTypes = {
    title: PropTypes.string,
    width: PropTypes.string,
}

export default ButtonOutlined;
