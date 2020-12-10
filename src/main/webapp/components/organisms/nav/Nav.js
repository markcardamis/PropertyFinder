import React, { useEffect, useState } from "react"; 
import { Link, useLocation } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import { useDispatch } from "react-redux";
import { IconMenuMobile, Logo, PropertyFetch } from "../../../assets/icons";

import "./nav.scss";
import TopNavList from "../../molecules/topNavList/TopNavList";
import { useAuth } from "../../../modules/auth";
import ButtonLogin from "../../atoms/buttonLogin/ButtonLogin";
import ButtonAccount from "../../atoms/buttonAccount/ButtonAccount";
import { login, logout } from "../../../store/actions/authAction";
import { showSignIn } from "../../../store/actions/signInModalAction";

const Nav = withAuth(({ auth }) => {
    const [ authenticated, user, accessToken ] = useAuth(auth);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        authenticated ? dispatch(login({ authenticated, user, accessToken })) : dispatch(logout({ authenticated, user, accessToken }));
    }, [ authenticated, user, accessToken ]);


        return (
             <div className='nav'>
                <Link className='navLogoLink' to='/'>
                    <div className='navLogo'><Logo/><PropertyFetch size={1.2}/></div>
                    <div className='navLogoMobile'><Logo/><PropertyFetch size={1.4}/></div>
                    <div className='headerTagLine'>searching land far and wide</div>
                </Link>
                <div className='navLinks'>
                    <TopNavList route={location.pathname}/>
                    {authenticated !== null && authenticated ? 
                        <ButtonAccount onClick={()=>dispatch(showSignIn())}/> : 
                        <ButtonLogin onClick={()=>dispatch(showSignIn())}/>
                        }
                </div>
                <div className='mobileMenuIcon' onClick={()=>dispatch({ type: "SHOW_MOBILE_NAV" })}>
                    <IconMenuMobile/>
                </div>
            </div>
        );
    });

export default Nav;