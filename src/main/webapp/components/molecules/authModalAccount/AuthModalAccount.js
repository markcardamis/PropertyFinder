import React from 'react';
import PropTypes from 'prop-types';

import { IconExit, IconSettings } from '../../../assets/icons';
import './authModalAccount.scss';
import PropListTitle from '../../atoms/propListTitle/PropListTitle';

const AuthModalAccount = props => {
    return (
        <>
            <div className='authModalAccount-btn'>
                <PropListTitle icon={<IconSettings/>} title16={'Account Setting'}/>
            </div>
            <div className='authModalAccount-btn'>
                <PropListTitle icon={<IconExit/>} title16={'Logout'}/>
            </div>
        </>
    )
}

AuthModalAccount.propTypes = {

}

export default AuthModalAccount
