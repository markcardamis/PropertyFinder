import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useOktaAuth } from '@okta/okta-react';
import "./loginForm.scss";
import TextInput from "../../atoms/textInput/TextInput";
import ButtonOutlined from "../../atoms/buttonOutlined/ButtonOutlined";
import ButtonFilled from "../../atoms/buttonFilled/ButtonFilled";
import { IconUser, IconKey, IconEye } from "../../../assets/icons";
import variables from "../../../styles/_variables.module.scss";

const LoginForm = (props) => {
      const { oktaAuth } = useOktaAuth();
      const [sessionToken, setSessionToken] = useState(null);
      const [userName, setUserName] = useState('');
      const [password, setPassword] = useState('');
      const [errorMessage, setErrorMessage] = useState('');
      const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
      props.dispatch({ type: "SHOW_LOADING" });

      oktaAuth.signIn({ username: userName, password })
      .then(res => setSessionToken(res.sessionToken))
      .catch(err => setErrorMessage(err.errorSummary));
      props.dispatch({ type: "HIDE_LOADING" });
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
            <div className={"loginFormForgot"} onClick={props.onForgotClick}>Forgot Password?</div>
          </div>
          <div>
            <div className={"loginFormBtn"}><ButtonOutlined title={"SIGN IN"} onClick={handleSubmit}/></div>
            <div className='loginFormText'>
                <div className='loginFormLine'/>Would you like to join?<div className='loginFormLine'/>
            </div>
            <div className={"loginFormBtn"}><ButtonFilled title={"SIGN UP"} onClick={props.onSignUp}/></div>
          </div>
        </div>
      );
    }

  const mapStateToProps = (state) => {
    return {
        loginForm: state,
    };
};

export default connect(mapStateToProps)(LoginForm);