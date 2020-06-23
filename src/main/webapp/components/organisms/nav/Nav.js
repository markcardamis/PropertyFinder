import React, {useEffect, useState} from 'react'; 
import {Link, useLocation} from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import {useSelector, useDispatch} from 'react-redux';

import {IconLogoTitle, IconMenuMobile} from '../../../assets/icons';
import './nav.scss';
import TopNavList from '../../molecules/topNavList/TopNavList';
import { useAuth } from '../../../modules/auth';
import ButtonLogin from '../../atoms/buttonLogin/ButtonLogin';
import ButtonAccount from '../../atoms/buttonAccount/ButtonAccount';
import {login, logout} from '../../../store/actions/authAction';
import { showSignIn } from '../../../store/actions/showSignInAction';
import {showMobileNav} from '../../../store/actions/showMobileNavAction';

const Nav = withAuth(({ auth }) => {
    const [authenticated, user] = useAuth(auth);
    const [authState, setAuth] = useState(authenticated)
    const location = useLocation();
    const dispatch = useDispatch()
    const all = useSelector(state=>state)

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
                        <ButtonAccount onClick={()=>dispatch(showSignIn())}/> : 
                        <ButtonLogin onClick={()=>dispatch(showSignIn())}/>
                        }
                </div>
                <div className='mobileMenuIcon' onClick={()=>dispatch({type: 'SHOW_MOBILE_NAV'})}>
                    <IconMenuMobile/>
                </div>
            </div>
        );
    })

export default Nav;