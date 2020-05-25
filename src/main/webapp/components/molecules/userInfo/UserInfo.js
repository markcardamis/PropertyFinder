import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import './userInfo.scss'
import TextInput from '../../atoms/textInput/TextInput'
import { IconAccount, IconUser, IconEmail } from '../../../assets/icons'

const UserInfo = props => {
    const [user, setUser] = useState(props.user&&props.user)
    return (
        <div>
            {props.user&&<div className='userInfoHeader'>User Information</div>}
            {props.user&&<div className='userInfo'>
                <div className='userInfoIcon'><IconUser/></div> 
                {user.name}
            </div>}
            {props.user&&<div className='userInfo'>
                <div className='userInfoIcon'><IconEmail/></div>
                 {user.email}
            </div>}
            <div className='userInfoNote'>For changes to your account or lost password please contact us: <a href='mailto:info@propertyfetch.com.au'>info@propertyfetch.com.au</a></div>
        </div>
    )
}

UserInfo.propTypes = {

}

export default UserInfo
