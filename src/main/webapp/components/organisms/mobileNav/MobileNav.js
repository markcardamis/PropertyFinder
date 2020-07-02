import React from 'react'
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

const MobileNav = withAuth(({ auth }) => {
    const [authenticated, user] = useAuth(auth);
    const location = useLocation();
    const dispatch = useDispatch()
    const showMobileNav = useSelector(state=>state.showMobileNav);

    const handleClick = () => {
        dispatch(closeMobileNav())
        dispatch(showSignIn())
    }
    return (
        <div className={!showMobileNav ? 'menuClosed' : 'mobileNav'}>
            <div className='mobileNavList'>
                <TopNavList route={location.pathname}/>
            </div>
            <div className='mobileNavLogin'>
            {authenticated !== null && authenticated ? 
                        <ButtonAccount onClick={handleClick}/> : 
                        <ButtonLogin onClick={handleClick}/>
                        }
            </div>
        </div>
    )
})

MobileNav.propTypes = {

}

export default MobileNav
