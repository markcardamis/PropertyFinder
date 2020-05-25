import React from 'react';
import PropTypes from 'prop-types';

import { IconExit, IconSettings } from '../../../assets/icons';
import './account.scss';
import PropListTitle from '../../atoms/propListTitle/PropListTitle';

const Account = props => {
    return (
        <>
            <div className='authModalAccount-btn' onClick={props.onAccountClick}>
                <PropListTitle icon={<IconSettings/>} title16={'Account Setting'}/>
            </div>
            <div className='authModalAccount-btn' onClick={props.onLogout}>
                <PropListTitle icon={<IconExit/>} title16={'Logout'}/>
            </div>
        </>
    )
}

Account.propTypes = {

}

export default Account;
