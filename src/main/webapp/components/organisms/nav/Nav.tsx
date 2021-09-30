import React, { useEffect } from "react"; 
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IconMenuMobile, Logo, PropertyFetch } from "../../../assets/icons";

import "./nav.scss";
import TopNavList from "../../molecules/topNavList/TopNavList";
import { useAuth } from "../../../hooks/useAuth";
import ButtonLogin from "../../atoms/buttonLogin/ButtonLogin";
import ButtonAccount from "../../atoms/buttonAccount/ButtonAccount";
import { login, logout } from "../../../store/actions/authAction";
import { showSignIn } from "../../../store/actions/signInModalAction";

const Nav = () => {
    const { isAuthenticated, user, accessToken } = useAuth();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        isAuthenticated ? dispatch(login({ isAuthenticated, user, accessToken })) : dispatch(logout({ isAuthenticated, user, accessToken }));
    }, [ isAuthenticated, user, accessToken ]);


        return (
             <div className='nav'>
                <Link className='navLogoLink' to='/'>
                    <div className='navLogo'><Logo/><PropertyFetch size={1.2}/></div>
                    <div className='navLogoMobile'><Logo/><PropertyFetch size={1.4}/></div>
                    <div className='headerTagLine'>searching land far and wide</div>
                </Link>
                <div className='navLinks'>
                    <TopNavList route={location.pathname}/>
                    {isAuthenticated !== null && isAuthenticated ? 
                        <ButtonAccount onClick={()=>dispatch(showSignIn())}/> : 
                        <ButtonLogin onClick={()=>dispatch(showSignIn())}/>
                        }
                </div>
                <div className='mobileMenuIcon' onClick={()=>dispatch({ type: "SHOW_MOBILE_NAV" })}>
                    <IconMenuMobile/>
                </div>
            </div>
        );
    };

export default Nav;