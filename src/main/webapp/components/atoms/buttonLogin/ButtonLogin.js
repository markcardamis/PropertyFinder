import React from 'react';
import PropTypes from 'prop-types';
import './buttonLogin.scss';

const ButtonLogin = props => {
    return (
        <div className='login' onClick={props.onClick}>
            <div className='title'>LOG IN</div>
        </div>
    )
}

ButtonLogin.propTypes = {
    onClick: PropTypes.func
}

export default ButtonLogin;
