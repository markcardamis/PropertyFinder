import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { withAuth } from '@okta/okta-react';

import { useAuth } from '../../../modules/auth';
import AuthModalBox from '../../molecules/authModalBox/AuthModalBox'
import LoginForm from '../../molecules/loginForm/LoginForm'
import RegisterForm from '../../molecules/registerForm/RegisterForm'
import AuthModalAccount from '../../molecules/authModalAccount/AuthModalAccount'

const AuthModal = withAuth(({ auth }) => {
    const [authenticated, user] = useAuth(auth);
    const [state, setState] = useState('login')

    const renderComponent = () => {
        if (state==='login' && authenticated) {
            return <AuthModalAccount onLogout={()=>{auth.logout(); setState('login')}}/>
        } else if (state==='login' && !authenticated) {
            return <LoginForm onSignUp={()=>setState('register')}/>
        } else if (state==='register') {
            <RegisterForm onBack={()=>setState('login')}/>
        }
    }
    return (
        <div>
            <AuthModalBox>
                {renderComponent()}
                {/* {state==='login' && <LoginForm onSignUp={()=>setState('register')}/>}
                {state==='account' && <AuthModalAccount onLogout={()=>{auth.logout(); setState('login')}}/>}
                {state==='register' && <RegisterForm onBack={()=>setState('login')}/>} */}
            </AuthModalBox>
        </div>
    )
})

AuthModal.propTypes = {
}

export default AuthModal;
