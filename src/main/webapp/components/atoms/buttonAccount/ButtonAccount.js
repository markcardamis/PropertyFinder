import React from 'react';
import PropTypes from 'prop-types';
import './buttonAccount.scss';
import {IconAccount, IconArD} from '../../../assets/icons'
import {useWindowSize} from '../../../modules/windowSize'

const ButtonAccount = props => {
    const size = useWindowSize();
    return (
        <div className='accountBtn' onClick={props.onClick}>
            <IconAccount color={size.width < 982 ? '#777F8B' : '#3D485A'}/>
            <div className='accountBtnTitle'>Account</div>
            <div className='accountBtnArrow'>
                <IconArD color={'#CFD1D6'}/>
            </div>
        </div>
    );
};

ButtonAccount.propTypes = {
    onClick: PropTypes.func
};

export default ButtonAccount;
