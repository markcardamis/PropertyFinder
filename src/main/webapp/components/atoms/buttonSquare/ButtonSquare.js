import React from 'react';
import PropTypes from 'prop-types';
import './buttonSquare.scss';

const ButtonSquare = props => {
    return (
        <div className='buttonSquare' onClick={props.onClick}>
            {props.icon}
        </div>
    )
}

ButtonSquare.propTypes = {
    onClick: PropTypes.func
}

export default ButtonSquare;
