import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useOktaAuth } from '@okta/okta-react';
import "./loginForm.scss";
import TextInput from "../../atoms/textInput/TextInput";
import ButtonOutlined from "../../atoms/buttonOutlined/ButtonOutlined";
import ButtonFilled from "../../atoms/buttonFilled/ButtonFilled";
import { IconUser, IconKey, IconEye } from "../../../assets/icons";
import variables from "../../../styles/_variables.module.scss";
import { hideLoading, showLoading } from "../../../store/actions/loadingAction";

export interface LoginFormProps {
  onForgotClick: () => void;
  onSignUp: () => void;
}

const LoginForm = ({ onForgotClick, onSignUp }: LoginFormProps) => {
      const { oktaAuth } = useOktaAuth();
      const dispatch = useDispatch();
      const [sessionToken, setSessionToken] = useState(null);
      const [userName, setUserName] = useState('');
      const [password, setPassword] = useState('');
      const [errorMessage, setErrorMessage] = useState('');
      const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
      dispatch(showLoading());

      oktaAuth.signIn({ username: userName, password })
      .then(res => setSessionToken(res.sessionToken))
      .catch(err => setErrorMessage(err.errorSummary));
      dispatch(hideLoading());
    }

    useEffect(() => {
      if (sessionToken) {
        oktaAuth.signInWithRedirect({ sessionToken });
        return null;
      }
    })

      const passIconColor = showPassword && Boolean(password) ? variables.darkGrey : variables.lightGrey;
 
      return (
        <div className='loginForm'>
          <div>
           <div className='loginFormTitle'>Log In</div>
             <div className={"loginFormInput"}>
                 <TextInput 
                    icon={<IconUser/>} 
                    placeholder={"User Name"}
                    value={userName}
                    onChange={(e)=>setUserName(e.target.value)}
                    />
            </div>
            <div className={"loginFormInput"}>
                <TextInput 
                    icon={<IconKey/>} 
                    rightIcon={<IconEye color={passIconColor}/>}
                    onRightIconClick={() => setShowPassword(!showPassword)}
                    type={showPassword ? "text" : "password"}
                    placeholder={"Password"}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
            </div>
            { errorMessage && <div className="authError">Login failed, please check your email and password</div>}
            <div className={"loginFormForgot"} onClick={onForgotClick}>Forgot Password?</div>
          </div>
          <div>
            <div className={"loginFormBtn"}><ButtonOutlined title={"SIGN IN"} onClick={handleSubmit}/></div>
            <div className='loginFormText'>
                <div className='loginFormLine'/>Would you like to join?<div className='loginFormLine'/>
            </div>
            <div className={"loginFormBtn"}><ButtonFilled title={"SIGN UP"} onClick={onSignUp}/></div>
          </div>
        </div>
      );
    }

export default LoginForm;