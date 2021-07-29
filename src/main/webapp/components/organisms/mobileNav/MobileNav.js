import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useOktaAuth } from '@okta/okta-react';
import Fade from "react-reveal/Fade";

import "./mobileNav.scss";
import { useAuth } from "../../../hooks/auth";
import TopNavList from "../../molecules/topNavList/TopNavList";
import ButtonLogin from "../../atoms/buttonLogin/ButtonLogin";
import ButtonAccount from "../../atoms/buttonAccount/ButtonAccount";
import LoginForm from "../../molecules/loginForm/LoginForm";
import Account from "../../molecules/account/Account";
import UserInfo from "../../molecules/userInfo/UserInfo";
import RegisterForm from "../../molecules/registerForm/RegisterForm";
import { IconExitMobile } from "../../../assets/icons";
import DeviderLine from "../../../components/atoms/deviderLine/DeviderLine";

const MobileNav = () => {
    const { isAuthenticated, user } = useAuth();
    const { oktaAuth } = useOktaAuth();
    const [ state, setState ] = useState("nav");
    const location = useLocation();

    const renderComponent = () => {
        if (state=="login") {
             return isAuthenticated ? <div className='mobileNav_formContainer'><Account onLogout={()=>{oktaAuth.signOut(); setState("login");}} onAccountClick={()=>setState("account")}/></div> :
                 <div className='mobileNav_formContainer'><LoginForm onSignUp={()=>setState("register")} onForgotClick={()=>setState("account")}/></div>;
         } else if (state=="register") {
             return <div className='mobileNav_formContainer'><RegisterForm onBack={()=>setState("login")}/></div>;
         } else if (state==="account") {
             return <div className='mobileNav_formContainer'><UserInfo user={user&&user}/></div>;
         } else if (state==="nav") {
             return <>
                        <div className='mobileNavList'>
                            {isAuthenticated !== null && isAuthenticated ? <div className='account'>
                                <ButtonAccount onClick={()=>setState("account")}/>
                                <DeviderLine/>
                            </div> : null}
                            <TopNavList route={location.pathname}/>
                        </div>
                        <div className='mobileNavLogin'>
                            {isAuthenticated !== null && isAuthenticated ? 
                                    <ButtonLogin icon={<IconExitMobile/>} title={"LOGOUT"} onClick={()=>{oktaAuth.signOut(); setState("login");}}/> :
                                    <ButtonLogin onClick={()=>setState("login")}/>
                                    }
                        </div>
                    </>;
         }

     };
    return (
        <Fade>
            <div className='mobileNav'>
                {renderComponent()}
            </div>
        </Fade>
    );
};

MobileNav.propTypes = {

};

export default MobileNav;
