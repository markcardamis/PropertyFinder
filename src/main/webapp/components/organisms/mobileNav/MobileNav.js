import React from 'react'
import {Link, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types'
import { withAuth } from '@okta/okta-react';
import './mobileNav.scss'
import { useAuth } from '../../../modules/auth';
import TopNavList from '../../molecules/topNavList/TopNavList'
import ButtonLogin from '../../atoms/buttonLogin/ButtonLogin';
import ButtonAccount from '../../atoms/buttonAccount/ButtonAccount';

const MobileNav = withAuth(({ auth }) => {
    const [authenticated, user] = useAuth(auth);
    const location = useLocation();
    return (
        <div className='mobileNav'>
            <div className='mobileNavList'>
                <TopNavList route={location.pathname}/>
            </div>
            <div className='mobileNavLogin'>
            {authenticated !== null && authenticated ? 
                        <ButtonAccount onClick={()=>dispatch(showSignIn())}/> : 
                        <ButtonLogin onClick={()=>dispatch(showSignIn())}/>
                        }
            </div>
        </div>
    )
})

MobileNav.propTypes = {

}

export default MobileNav
