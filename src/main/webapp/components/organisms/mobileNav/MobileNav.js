import React, {useState} from 'react'
import {Link, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types'
import  {useDispatch, useSelector} from 'react-redux'
import { withAuth } from '@okta/okta-react';
import './mobileNav.scss'
import { useAuth } from '../../../modules/auth';
import TopNavList from '../../molecules/topNavList/TopNavList'
import ButtonLogin from '../../atoms/buttonLogin/ButtonLogin';
import ButtonAccount from '../../atoms/buttonAccount/ButtonAccount';
import { closeMobileNav } from '../../../store/actions/showMobileNavAction';
import {showSignIn} from '../../../store/actions/signInAction'
import LoginForm from '../../molecules/loginForm/LoginForm';
import Account from '../../molecules/account/Account';
import UserInfo from '../../molecules/userInfo/UserInfo';
import RegisterForm from '../../molecules/registerForm/RegisterForm';

const MobileNav = withAuth(({ auth }) => {
    const [authenticated, user] = useAuth(auth);
    const [state, setState] = useState('nav')
    const location = useLocation();
    //const dispatch = useDispatch()
    const showMobileNav = useSelector(state=>state.showMobileNav);

    // const handleClick = () => {
    //     dispatch(closeMobileNav())
    //     dispatch(showSignIn())
    // }
    const renderComponent = () => {
        if (state=='login') {
             return authenticated ?  <div className='mobileNav_formContainer'><Account onLogout={()=>{auth.logout(); setState('login')}} onAccountClick={()=>setState('account')}/></div> :
                 <div className='mobileNav_formContainer'><LoginForm onSignUp={()=>setState('register')} onForgotClick={()=>setState('account')}/></div>
         } else if (state=='register') {
             return   <div className='mobileNav_formContainer'><RegisterForm onBack={()=>setState('login')}/></div>
         } else if (state==='account') {
             return  <div className='mobileNav_formContainer'><UserInfo user={user&&user}/></div>
         } else if (state==='nav') {
             return <>
                        <div className='mobileNavList'>
                            <TopNavList route={location.pathname}/>
                        </div>
                        <div className='mobileNavLogin'>
                            {authenticated !== null && authenticated ? 
                                    <ButtonAccount onClick={()=>setState('account')}/> : 
                                    <ButtonLogin onClick={()=>setState('login')}/>
                                    }
                        </div>
                    </>
         }
     }
    return (
        <div className={!showMobileNav ? 'menuClosed' : 'mobileNav'}>
            {renderComponent()}
        </div>
    )
})

MobileNav.propTypes = {

}

export default MobileNav
