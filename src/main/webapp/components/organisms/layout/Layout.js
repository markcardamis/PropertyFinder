import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector} from 'react-redux';
import { useHistory} from 'react-router-dom';

import Nav from '../nav/Nav';
import {showFilter as showFilterAction, closeFilter} from '../../../store/actions/showFilterAction';
import {closeSignIn, showSignIn} from '../../../store/actions/showSignInAction';
import AuthModal from '../authModal/AuthModal';
import MobileNav from '../mobileNav/MobileNav';
import './layout.scss'

const Layout = props => {
    const dispatch = useDispatch();
    const history = useHistory()
    const showSignInModal = useSelector(state=>state.showSignIn);
    const showMobileNav = useSelector(state=>state.showMobileNav);

    useEffect(()=>{
        history.location.pathname == '/signup' ? dispatch(showSignIn()) : dispatch(closeSignIn())
        history.location.pathname === '/search' ? dispatch(showFilterAction()) : dispatch(closeFilter())
      }, [])


    return (
        <div className='layout'>

            <Nav/>
            {showSignInModal && <AuthModal/>}
            {showMobileNav && <MobileNav/>}
            {props.children}
        </div>
    )
}

Layout.propTypes = {}

export default Layout
