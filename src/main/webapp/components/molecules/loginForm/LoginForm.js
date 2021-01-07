import React, { Component } from "react";
import OktaAuth from "@okta/okta-auth-js";
import { withAuth } from "@okta/okta-react";
import { connect } from "react-redux";
import "./loginForm.scss";
import TextInput from "../../atoms/textInput/TextInput";
import ButtonOutlined from "../../atoms/buttonOutlined/ButtonOutlined";
import ButtonFilled from "../../atoms/buttonFilled/ButtonFilled";
import { IconUser, IconKey, IconEye } from "../../../assets/icons";
import variables from "../../../styles/_variables.scss";

class LoginForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sessionToken: null,
        data: null,
        userName: "",
        password: "",
        showPassword: false,
        errorMessage: ""
      };
      this.oktaAuth = new OktaAuth({ issuer: process.env.OKTA_URL });
    }

  handleSubmit = async (e) => {
      this.props.dispatch({ type: "SHOW_LOADING" });

      this.oktaAuth.signIn({
        username: this.state.userName,
        password: this.state.password
      })
      .then(res => this.setState({
        sessionToken: res.sessionToken
      }))
      .catch(err => {
        console.log(err.errorSummary);
        this.setState({ errorMessage: err.errorSummary });
      });
      this.props.dispatch({ type: "HIDE_LOADING" });
    }

    render() {
      if (this.state.sessionToken) {
        this.props.auth.redirect({ sessionToken: this.state.sessionToken });
        return null;
      }
      const passIconColor = this.state.showPassword && Boolean(this.state.password) ? variables.darkGrey : variables.lightGrey;
 
      return (
        <div className='loginForm'>
          <div>
           <div className='loginFormTitle'>Log In</div>
             <div className={"loginFormInput"}>
                 <TextInput 
                    icon={<IconUser/>} 
                    placeholder={"User Name"}
                    value={this.state.userName}
                    onChange={(e)=>this.setState({ userName: e.target.value })}
                    />
            </div>
            <div className={"loginFormInput"}>
                <TextInput 
                    icon={<IconKey/>} 
                    rightIcon={<IconEye color={passIconColor}/>}
                    onRightIconClick={() => this.setState({showPassword: !this.state.showPassword})}
                    type={this.state.showPassword ? "text" : "password"}
                    placeholder={"Password"}
                    value={this.state.password}
                    onChange={(e)=>this.setState({ password: e.target.value })}
                    />
            </div>
            { this.state.errorMessage && <div className="authError">Login failed, please check your email and password</div>}
            <div className={"loginFormForgot"} onClick={this.props.onForgotClick}>Forgot Password?</div>
          </div>
          <div>
            <div className={"loginFormBtn"}><ButtonOutlined title={"SIGN IN"} onClick={this.handleSubmit}/></div>
            <div className='loginFormText'>
                <div className='loginFormLine'/>Would you like to join?<div className='loginFormLine'/>
            </div>
            <div className={"loginFormBtn"}><ButtonFilled title={"SIGN UP"} onClick={this.props.onSignUp}/></div>
          </div>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
        loginForm: state,
    };
};

export default withAuth(connect(mapStateToProps)(LoginForm));