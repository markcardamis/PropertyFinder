import React from 'react';
import PropTypes from 'prop-types';

import { IconExit, IconSettings } from '../../../assets/icons';
import './authModalAccount.scss';
import PropListTitle from '../../atoms/propListTitle/PropListTitle';

const AuthModalAccount = props => {
    return (
        <>
            <div className='authModalAccount-btn' style={{opacity: 0.5}}>
                <PropListTitle icon={<IconSettings/>} title16={'Account Setting'}/>
            </div>
            <div className='authModalAccount-btn' onClick={props.onLogout}>
                <PropListTitle icon={<IconExit/>} title16={'Logout'}/>
            </div>
        </>
    )
}

AuthModalAccount.propTypes = {

}

export default AuthModalAccount;
