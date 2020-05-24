import React from 'react'
import PropTypes from 'prop-types';
import './buttonAccount.scss';
import {IconAccount, IconArD} from '../../../assets/icons';

const ButtonAccount = props => {
    return (
        <div className='accountBtn' onClick={props.onClick}>
            <IconAccount/>
            <div className='accountBtnTitle'>Account</div>
            <IconArD color={'#CFD1D6'}/>
        </div>
    )
}

ButtonAccount.propTypes = {
    onClick: PropTypes.func
}

export default ButtonAccount;
