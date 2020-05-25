import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { withAuth } from '@okta/okta-react';

import { useAuth } from '../../../modules/auth';
import AuthModalBox from '../../molecules/authModalBox/AuthModalBox'
import LoginForm from '../../molecules/loginForm/LoginForm'
import RegisterForm from '../../molecules/registerForm/RegisterForm'
import Account from '../../molecules/account/Account'
import UserInfo from '../../molecules/userInfo/UserInfo'

const AuthModal = withAuth(({ auth }) => {
    const [authenticated, user] = useAuth(auth);
    const [state, setState] = useState('login')

    const renderComponent = () => {
       if (state=='login') {
            return authenticated ? <Account onLogout={()=>{auth.logout(); setState('login')}} onAccountClick={()=>setState('account')}/> :
                <LoginForm onSignUp={()=>setState('register')} onForgotClick={()=>setState('account')}/>
        } else if (state=='register') {
            return  <RegisterForm onBack={()=>setState('login')}/>
        } else if (state==='account') {
            return <UserInfo user={user&&user}/>
        }
    }
    return (
        <div>
            <AuthModalBox>
                {renderComponent()}
            </AuthModalBox>
        </div>
    )
})

AuthModal.propTypes = {
}

export default AuthModal;
