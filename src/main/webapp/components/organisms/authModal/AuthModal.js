import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import { withAuth } from '@okta/okta-react';

import { useAuth } from '../../../modules/auth';
import AuthModalBox from '../../molecules/authModalBox/AuthModalBox'
import LoginForm from '../../molecules/loginForm/LoginForm'
import RegisterForm from '../../molecules/registerForm/RegisterForm'
import Account from '../../molecules/account/Account'
import UserInfo from '../../molecules/userInfo/UserInfo'
import { useDispatch } from 'react-redux';

const AuthModal = withAuth(({ auth }) => {
    const [authenticated, user] = useAuth(auth);
    const [state, setState] = useState('login')
    const dispatch = useDispatch()
    const node = useRef();

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, []);

    const handleClick = e => {
        if (node.current.contains(e.target)) {
          return;
        }
        dispatch({type: 'CLOSE_SIGNIN'})
      }

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
        <div ref={node}>
            <AuthModalBox>
                {renderComponent()}
            </AuthModalBox>
        </div>
    )
})

AuthModal.propTypes = {
}

export default AuthModal;
