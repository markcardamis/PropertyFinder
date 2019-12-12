import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import './Login.css';

export default withAuth(
  class RegistrationForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        sessionToken: null
      };
      this.oktaAuth = new OktaAuth({ url: props.baseUrl });
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.checkAuthentication();

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
      this.handleLastNameChange = this.handleLastNameChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    async checkAuthentication() {
      const sessionToken = await this.props.auth.getIdToken();
      if (sessionToken) {
        this.setState({ sessionToken });
      }
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    handleFirstNameChange(e) {
      this.setState({ firstName: e.target.value });
    }
    handleLastNameChange(e) {
      this.setState({ lastName: e.target.value });
    }
    handleEmailChange(e) {
      this.setState({ email: e.target.value });
    }
    handlePasswordChange(e) {
      this.setState({ password: e.target.value });
    }

    handleSubmit(e) {
      e.preventDefault();
      fetch('/api/account', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
      .then(user => {
        this.oktaAuth
          .signIn({
            username: this.state.email,
            password: this.state.password
          })
          .then(res =>
            this.setState({
              sessionToken: res.sessionToken
            })
          );
      })
      .catch(err => console.log);
    }
    
    render () {
      if (this.state.sessionToken) {
        this.props.auth.redirect({ sessionToken: this.state.sessionToken });
        return null;
      }

      return (
        <div className='container col-lg-12 justify-content-center'>
          <form className='loginForm col-sm-5 col-lg-3' onSubmit={this.handleSubmit}>
            <label>First Name:</label>  
            <input
              className='formInput'
              id="firstName"
              type="text"
              value={this.state.firstName}
              onChange={this.handleFirstNameChange}
            />
            <label>Last Name:</label>
            <input
              id="lastName"
              type="text"
              value={this.state.lastName}
              onChange={this.handleLastNameChange}
            />
            <label>Email:</label>
            <input
              className='formInput'
              id="email"
              type="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            <label>Password:</label>
            <input
              className='formInput'
              id="password"
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
            <input className='formInput' id="submit" type="submit" value="Register" />
          </form>
        </div>
      );
    }
  }
);