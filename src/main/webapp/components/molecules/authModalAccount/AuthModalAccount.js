import React from 'react'
import PropTypes from 'prop-types'
import PropListItem from '../propListItem/PropListItem'
import { IconExit, IconSettings } from '../../../assets/icons'
import './authModalAccount.scss'
import PropListTitle from '../../atoms/propListTitle/PropListTitle'

const AuthModalAccount = props => {
    return (
        <div>
            <div className='authModalAccount-btn'>
                <PropListTitle icon={<IconSettings/>} title16={'Account Setting'}/>
            </div>
            <div className='authModalAccount-btn'>
                <PropListTitle icon={<IconExit/>} title16={'Logout'}/>
            </div>
        </div>
    )
}

AuthModalAccount.propTypes = {

}

export default AuthModalAccount
