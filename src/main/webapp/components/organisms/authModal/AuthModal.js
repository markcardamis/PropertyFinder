import React, { useState, useRef, useEffect } from "react";
import { withOktaAuth } from "@okta/okta-react";
import { useHistory } from "react-router-dom";
import Fade from "react-reveal/Fade";

import { useAuth } from "../../../modules/auth";
import PopupContainer from "../../molecules/popupContainer/PopupContainer";
import LoginForm from "../../molecules/loginForm/LoginForm";
import RegisterForm from "../../molecules/registerForm/RegisterForm";
import Account from "../../molecules/account/Account";
import UserInfo from "../../molecules/userInfo/UserInfo";
import { useDispatch } from "react-redux";
import "./authModal.scss";

const AuthModal = withOktaAuth(({ authService }) => {
    const history = useHistory();
    const [ authenticated, user ] = useAuth(authService);
    const [ state, setState ] = useState( history.location.pathname === "/signup" ? "register" : "login");
    const dispatch = useDispatch();
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
        dispatch({ type: "CLOSE_SIGNIN" });
      };

      
    const renderComponent = () => {
       if (state=="login") {
            return authenticated ? <Account onLogout={()=>{authService.logout(); setState("login");}} onAccountClick={()=>setState("account")}/> :
                <LoginForm onSignUp={()=>setState("register")} onForgotClick={()=>setState("account")}/>;
        } else if (state=="register") {
            return <RegisterForm onBack={()=>setState("login")}/>;
        } else if (state==="account") {
            return <UserInfo user={user&&user}/>;
        }
    };
    return (
      <div ref={node}>
        <Fade>
          <div className='authModal'>
              <PopupContainer style={{ right: "15px", top: "80px", width: "354px" }}>
                  {renderComponent()}
              </PopupContainer>
          </div>
        </Fade>
      </div>
    );
});

export default AuthModal;
