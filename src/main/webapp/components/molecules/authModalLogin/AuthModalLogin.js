import React, {useState} from 'react'
import PropTypes from 'prop-types'

import './authModalLogin.scss'
import TextInput from '../../atoms/textInput/TextInput'
import variables from '../../../styles/_variables.scss'
import ButtonOutlined from '../../atoms/buttonOutlined/ButtonOutlined'
import ButtonFilled from '../../atoms/buttonFilled/ButtonFilled'
import { IconUser, IconKey } from '../../../assets/icons'

const AuthModalLogin = props => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div>
            <div className='authModalLogin-title'>Log In</div>
            <div className={'authModalLogin-input'}>
                <TextInput 
                    icon={<IconUser/>} 
                    placeholder={'User Name'}
                    value={userName}
                    onChange={(e)=>setUserName(e.target.value)}
                    />
            </div>
            <div className={'authModalLogin-input'}>
                <TextInput 
                    icon={<IconKey/>} 
                    placeholder={'Password'}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
            </div>
            <div className={'authModalLogin-forgot'} onClick={()=>{}}>Forgot Password?</div>
            <div className={'authModalLogin-btn'}><ButtonOutlined title={'SIGN IN'}/></div>
            <div className='authModalLogin-text'>
                <div className='line'/>Would you like to join?<div className='line'/>
            </div>
            <div className={'authModalLogin-btn'}><ButtonFilled title={'SIGN UP'}/></div>
        </div>
    )
}

AuthModalLogin.propTypes = {

}

export default AuthModalLogin
