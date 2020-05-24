import React, { Component } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import './loginForm.scss'
import TextInput from '../../atoms/textInput/TextInput'
import ButtonOutlined from '../../atoms/buttonOutlined/ButtonOutlined'
import ButtonFilled from '../../atoms/buttonFilled/ButtonFilled'
import { IconUser, IconKey } from '../../../assets/icons'

class LoginForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sessionToken: null,
        data: null,
        userName: '',
        password: '',
        errorMessage: ''
      };
      this.oktaAuth = new OktaAuth({ url: 'https://dev-842802.okta.com' });
    }

  handleSubmit = async (e) => {
      this.props.dispatch({type: 'SHOW_LOADING'})

      this.oktaAuth.signIn({
        username: this.state.userName,
        password: this.state.password
      })
      .then(res => this.setState({
        sessionToken: res.sessionToken
      }))
      .catch(err => {
        console.log(err.errorSummary);
        this.setState({errorMessage: err.errorSummary});
      })
      this.props.dispatch({type: 'HIDE_LOADING'})
    }

    render() {
      if (this.state.sessionToken) {
        this.props.auth.redirect({sessionToken: this.state.sessionToken});
        return null;
      }
 
      return (
        <div>
           <div className='loginFormTitle'>Log In</div>
             <div className={'loginFormInput'}>
                 <TextInput 
                    icon={<IconUser/>} 
                    placeholder={'User Name'}
                    value={this.state.userName}
                    onChange={(e)=>this.setState({userName: e.target.value})}
                    />
            </div>
            <div className={'loginFormInput'}>
                <TextInput 
                    icon={<IconKey/>} 
                    placeholder={'Password'}
                    value={this.state.password}
                    onChange={(e)=>this.setState({password: e.target.value})}
                    />
            </div>
            { this.state.errorMessage && <div className="authError">Login failed, please check your email and password</div>}
            {/* <div className={'loginFormForgot'} onClick={()=>{}}>Forgot Password?</div> */}
            <div className={'loginFormBtn'}><ButtonOutlined title={'SIGN IN'} onClick={this.handleSubmit}/></div>
            <div className='loginFormText'>
                <div className='loginFormLine'/>Would you like to join?<div className='loginFormLine'/>
            </div>
            <div className={'loginFormBtn'}><ButtonFilled title={'SIGN UP'} onClick={this.props.onSignUp}/></div>
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

