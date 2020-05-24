import React, {useEffect, useState} from 'react'; 
import {Link, useLocation} from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import {useSelector, useDispatch} from 'react-redux'

import {IconLogoTitle} from '../../../assets/icons';
import './nav.scss';
import TopNavList from '../../molecules/topNavList/TopNavList';
import { useAuth } from '../../../modules/auth';
import ButtonLogin from '../../atoms/buttonLogin/ButtonLogin';
import ButtonAccount from '../../atoms/buttonAccount/ButtonAccount';
import {login, logout} from '../../../store/actions/authAction';
import { showSignIn } from '../../../store/actions/showSignInAction';


const Nav = withAuth(({ auth }) => {
    const [authenticated, user] = useAuth(auth);
    const [authState, setAuth] = useState(authenticated)
    const location = useLocation();
    const dispatch = useDispatch()
    // const dispatch = useDispatch()
    // const all = useSelector(state=>state)

    // useEffect(() => {
    //     setAuth(authenticated)
    //     authState ? dispatch(login()) : dispatch(logout())
    // }, [authenticated])

        return (
             <div className='nav'>
                <Link to='/'><IconLogoTitle/></Link>
                <div className='navLinks'>
                    <TopNavList route={location.pathname}/>
                    {authenticated !== null && authenticated ? 
                        // <div onClick={()=>auth.logout()}><ButtonAccount/></div> : 
                        // <div onClick={()=>auth.login()}><ButtonLogin/></div>
                        //<div onClick={()=>dispatch(showSignIn())}><ButtonAccount/></div> : 
                        <div onClick={()=>auth.logout()}><ButtonAccount/></div> : 
                        <div onClick={()=>dispatch(showSignIn())}><ButtonLogin/></div>
                        }
                </div>
            </div>
        );
    })

export default Nav;