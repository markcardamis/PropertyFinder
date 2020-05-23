import React, {useState} from 'react'
import PropTypes from 'prop-types'

import './authModalRegister.scss'
import TextInput from '../../atoms/textInput/TextInput'
import variables from '../../../styles/_variables.scss'
import ButtonOutlined from '../../atoms/buttonOutlined/ButtonOutlined'
import ButtonFilled from '../../atoms/buttonFilled/ButtonFilled'
import { IconUser, IconKey, IconEmail, IconArL } from '../../../assets/icons'

const AuthModalRegister = props => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div>
            <div className='authModalRegister-title'>
                <IconArL/>
                Registration
                <div/>
            </div>
            <div className={'authModalRegister-input'}>
                <TextInput 
                    icon={<IconUser/>} 
                    placeholder={'Full Name'}
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
            </div>
            <div className={'authModalRegister-input'}>
                <TextInput 
                    icon={<IconEmail/>} 
                    placeholder={'Email'}
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
            </div>
            <div className={'authModalRegister-input'}>
                <TextInput 
                    icon={<IconKey/>} 
                    placeholder={'Password'}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
            </div>
            <div className={'authModalRegister-agree'} onClick={()=>{}}>By clicking the button you accept the Terms and Conditions and Privacy Policy</div>
            <div className={'authModalRegister-btn'}><ButtonFilled title={'SIGN UP'}/></div>
        </div>
    )
}

AuthModalRegister.propTypes = {

}

export default AuthModalRegister
