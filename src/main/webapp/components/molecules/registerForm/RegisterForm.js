import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import './registerForm.scss'
import TextInput from '../../atoms/textInput/TextInput'
import ButtonFilled from '../../atoms/buttonFilled/ButtonFilled'
import { IconUser, IconKey, IconEmail, IconArL } from '../../../assets/icons'
import {validateEmail, validatePassword} from '../../../shared/validators'

class RegisterForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        sessionToken: null,
        errorMessage: '',
        validation: {}
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
    if (validateEmail(this.state.email)&&
        validatePassword(this.state.password)&&
        this.state.firstName.length>0&&
        this.state.lastName.length>0) {

      fetch('/api/account', {
        method: 'POST',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
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
        .then(res => this.setState({sessionToken: res.sessionToken}))})
      .catch(err => {
        console.log(err.message);
        this.setState({errorMessage: err.message});
      })
    } else {
      if (this.state.firstName.length===0 || this.state.lastName.length===0) {
        this.setState(prevState =>({validation: {...prevState.validation, required: 'required'}}))
      }
      if (!validateEmail(this.state.email)) {
        this.setState(prevState =>({validation: {...prevState.validation, email: 'invalid email'}
      }))}
      if (!validatePassword(this.state.password)) {
        this.setState(prevState =>({validation: {...prevState.validation, password: 'invalid password'}}))
      }
    }}
    
    render () {
      if (this.state.sessionToken) {
        this.props.auth.redirect({ sessionToken: this.state.sessionToken });
        return null;
      }
      const {validation, email, firstName, lastName, password} = this.state

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
                    value={firstName}
                    onChange={(e)=>this.setState({firstName: e.target.value, validation: {}})}
                    />
                {firstName.length==0&&validation.required&&<div className='validation'>{validation.required}</div>}
            </div>
            <div className={'registerFormInput'}>
                 <TextInput 
                    icon={<IconUser/>} 
                    placeholder={'Last Name'}
                    value={lastName}
                    onChange={(e)=>this.setState({lastName: e.target.value, validation: {}})}
                    />
                {lastName.length==0&&validation.required&&<div className='validation'>{validation.required}</div>}
            </div>
              <div>{validation.lastName&&validation.lastName}</div>
            <div className={'registerFormInput'}>
                <TextInput 
                    icon={<IconEmail/>} 
                    placeholder={'Email'}
                    value={this.state.email}
                    onChange={(e)=>this.setState({email: e.target.value, validation: {}})}
                    />
                {validation.email&&<div className='validation'>{validation.email}</div>}
            </div>

            <div className={'registerFormInput'}>
                <TextInput 
                    icon={<IconKey/>} 
                    placeholder={'Password'}
                    type={'password'}
                    value={this.state.password}
                    onChange={(e)=>this.setState({password: e.target.value, validation: {}})}
                />
                {validation.password&&<div className='validation'>{validation.password}</div>}
            </div>
            { this.state.errorMessage && <div className="authError"> Registration failed, this account is already registered </div> }
            {/* <div className={'registerFormAgree'}>By clicking the button you accept the Terms and Conditions and Privacy Policy</div> */}
            <div className={'registerFormBtn'}><ButtonFilled title={'SIGN UP'} onClick={this.handleSubmit}/></div>
        </div>
      );
    }
  }
  export default withAuth(RegisterForm);
