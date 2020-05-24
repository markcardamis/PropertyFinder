import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import './registerForm.scss'
import TextInput from '../../atoms/textInput/TextInput'
import ButtonFilled from '../../atoms/buttonFilled/ButtonFilled'
import { IconUser, IconKey, IconEmail, IconArL } from '../../../assets/icons'

class RegisterForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        sessionToken: null,
        errorMessage: ''
      };
      
      this.oktaAuth = new OktaAuth({ url: 'https://dev-842802.okta.com' });
      this.checkAuthentication();
    }

    checkAuthentication = async () => {
      const sessionToken = await this.props.auth.getIdToken();
      if (sessionToken) {
        this.setState({ sessionToken });
      }
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    handleSubmit = (e) => {
      e.preventDefault();

      fetch('/api/account', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
      .then(response => {
        return response.json().then(json => {
          return response.ok ? json : Promise.reject(json);
        });
      })
      .then(user => {
        this.oktaAuth.signIn({
          username: this.state.email,
          password: this.state.password
        })
        .then(res =>
          this.setState({
            sessionToken: res.sessionToken
          }))
      })
      .catch(err => {
        console.log(err.message);
        this.setState({errorMessage: err.message});
      })
    }
    
    render () {
      if (this.state.sessionToken) {
        this.props.auth.redirect({ sessionToken: this.state.sessionToken });
        return null;
      }

      return (
        <div>
             <div className='registerFormTitle'>
                 <div onClick={this.props.onBack}><IconArL/></div>
                    Registration
                 <div/>
             </div>
             <div className={'registerFormInput'}>
                 <TextInput 
                    icon={<IconUser/>} 
                    placeholder={'First Name'}
                    value={this.state.firstName}
                    onChange={(e)=>this.setState({firstName: e.target.value})}
                    />
            </div>
            <div className={'registerFormInput'}>
                 <TextInput 
                    icon={<IconUser/>} 
                    placeholder={'Last Name'}
                    value={this.state.lastName}
                    onChange={(e)=>this.setState({lastName: e.target.value})}
                    />
            </div>
            <div className={'registerFormInput'}>
                <TextInput 
                    icon={<IconEmail/>} 
                    placeholder={'Email'}
                    value={this.state.email}
                    onChange={(e)=>this.setState({email: e.target.value})}
                    />
            </div>
            <div className={'registerFormInput'}>
                <TextInput 
                    icon={<IconKey/>} 
                    placeholder={'Password'}
                    value={this.state.password}
                    onChange={(e)=>this.setState({password: e.target.value})}
                />
            </div>
            {/* { this.state.errorMessage && <div className="authError"> Registration failed, this account is already registered </div> } */}
            {/* <div className={'registerFormAgree'}>By clicking the button you accept the Terms and Conditions and Privacy Policy</div> */}
            <div className={'registerFormBtn'}><ButtonFilled title={'SIGN UP'} onClick={this.handleSubmit}/></div>
        </div>
      );
    }
  }
  export default withAuth(RegisterForm);
